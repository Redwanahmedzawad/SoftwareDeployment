using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Verisys.Api.Data;
using Verisys.Api.Models;
using Xunit;

namespace Verisys.Api.IntegrationTests;

public class TestAppFactory : WebApplicationFactory<Program>
{
    private SqliteConnection? _conn;

    protected override void ConfigureWebHost(Microsoft.AspNetCore.Hosting.IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Remove the existing AppDb registration (Postgres)
            var descriptor = services.Single(d => d.ServiceType == typeof(DbContextOptions<AppDb>));
            services.Remove(descriptor);

            // Use a single in-memory SQLite connection for the test run
            _conn = new SqliteConnection("DataSource=:memory:");
            _conn.Open();

            services.AddDbContext<AppDb>(o => o.UseSqlite(_conn));

            // Build and create schema
            using var sp = services.BuildServiceProvider();
            using var scope = sp.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDb>();
            db.Database.EnsureCreated();
        });
    }

    protected override void Dispose(bool disposing)
    {
        base.Dispose(disposing);
        _conn?.Dispose();
    }
}

public class TasksEndpointsTests : IClassFixture<TestAppFactory>
{
    private readonly HttpClient _client;
    private readonly TestAppFactory _factory;

    public TasksEndpointsTests(TestAppFactory factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
        
        // Clean the database before each test
        using var scope = factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDb>();
        db.Database.EnsureDeleted();
        db.Database.EnsureCreated();
    }

    [Fact]
    public async Task GetTasks_ReturnsEmptyList_WhenNoTasksExist()
    {
        var response = await _client.GetAsync("/api/tasks");
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var tasks = await response.Content.ReadFromJsonAsync<List<TaskItem>>();
        tasks.Should().NotBeNull();
        tasks!.Should().BeEmpty();
    }

    [Fact]
    public async Task PostTask_CreatesNewTask_AndReturnsCreatedStatus()
    {
        var newTask = new TaskItem(0, "New Task", "todo");
        
        var response = await _client.PostAsJsonAsync("/api/tasks", newTask);
        response.StatusCode.Should().Be(HttpStatusCode.Created);
        
        var createdTask = await response.Content.ReadFromJsonAsync<TaskItem>();
        createdTask.Should().NotBeNull();
        createdTask!.Title.Should().Be("New Task");
        createdTask.Status.Should().Be("todo");
        createdTask.Id.Should().BeGreaterThan(0);
        
        response.Headers.Location.Should().NotBeNull();
        response.Headers.Location!.ToString().Should().Contain($"/api/tasks/{createdTask.Id}");
    }

    [Fact]
    public async Task GetTasks_ReturnsAllTasks_AfterCreating()
    {
        await _client.PostAsJsonAsync("/api/tasks", new TaskItem(0, "Task 1", "todo"));
        await _client.PostAsJsonAsync("/api/tasks", new TaskItem(0, "Task 2", "in-progress"));
        
        var response = await _client.GetAsync("/api/tasks");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var tasks = await response.Content.ReadFromJsonAsync<List<TaskItem>>();
        tasks.Should().NotBeNull();
        tasks!.Count.Should().BeGreaterThanOrEqualTo(2);
        tasks.Should().Contain(t => t.Title == "Task 1");
        tasks.Should().Contain(t => t.Title == "Task 2");
    }

    [Fact]
    public async Task PutTask_UpdatesExistingTask_AndReturnsNoContent()
    {
        var createResponse = await _client.PostAsJsonAsync("/api/tasks", new TaskItem(0, "Original", "todo"));
        var created = await createResponse.Content.ReadFromJsonAsync<TaskItem>();
        
        var updated = created! with { Title = "Updated", Status = "done" };
        var updateResponse = await _client.PutAsJsonAsync($"/api/tasks/{created.Id}", updated);
        updateResponse.StatusCode.Should().Be(HttpStatusCode.NoContent);
        
        var getResponse = await _client.GetAsync("/api/tasks");
        var tasks = await getResponse.Content.ReadFromJsonAsync<List<TaskItem>>();
        var updatedTask = tasks!.First(t => t.Id == created.Id);
        updatedTask.Title.Should().Be("Updated");
        updatedTask.Status.Should().Be("done");
    }

    [Fact]
    public async Task PutTask_ReturnsNotFound_WhenTaskDoesNotExist()
    {
        var nonExistentTask = new TaskItem(999999, "Does Not Exist", "todo");
        
        var response = await _client.PutAsJsonAsync("/api/tasks/999999", nonExistentTask);
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task DeleteTask_RemovesTask_AndReturnsNoContent()
    {
        var createResponse = await _client.PostAsJsonAsync("/api/tasks", new TaskItem(0, "To Delete", "todo"));
        var created = await createResponse.Content.ReadFromJsonAsync<TaskItem>();
        
        var deleteResponse = await _client.DeleteAsync($"/api/tasks/{created!.Id}");
        deleteResponse.StatusCode.Should().Be(HttpStatusCode.NoContent);
        
        var getResponse = await _client.GetAsync("/api/tasks");
        var tasks = await getResponse.Content.ReadFromJsonAsync<List<TaskItem>>();
        tasks!.Should().NotContain(t => t.Id == created.Id);
    }

    [Fact]
    public async Task DeleteTask_ReturnsNotFound_WhenTaskDoesNotExist()
    {
        var response = await _client.DeleteAsync("/api/tasks/999999");
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task HealthCheck_ReturnsOk()
    {
        var response = await _client.GetAsync("/healthz");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var content = await response.Content.ReadAsStringAsync();
        content.Trim('"').Should().Be("Healthy");
    }

    [Fact]
    public async Task TaskLifecycle_CreateUpdateDelete()
    {
        // Create
        var createResponse = await _client.PostAsJsonAsync("/api/tasks", new TaskItem(0, "Lifecycle Task", "todo"));
        createResponse.StatusCode.Should().Be(HttpStatusCode.Created);
        var task = await createResponse.Content.ReadFromJsonAsync<TaskItem>();
        task.Should().NotBeNull();
        
        // Update to in-progress
        var inProgress = task! with { Status = "in-progress" };
        var updateResponse1 = await _client.PutAsJsonAsync($"/api/tasks/{task.Id}", inProgress);
        updateResponse1.StatusCode.Should().Be(HttpStatusCode.NoContent);
        
        // Update to done
        var done = task with { Status = "done" };
        var updateResponse2 = await _client.PutAsJsonAsync($"/api/tasks/{task.Id}", done);
        updateResponse2.StatusCode.Should().Be(HttpStatusCode.NoContent);
        
        // Verify final state
        var getResponse = await _client.GetAsync("/api/tasks");
        var tasks = await getResponse.Content.ReadFromJsonAsync<List<TaskItem>>();
        var finalTask = tasks!.First(t => t.Id == task.Id);
        finalTask.Status.Should().Be("done");
        
        // Delete
        var deleteResponse = await _client.DeleteAsync($"/api/tasks/{task.Id}");
        deleteResponse.StatusCode.Should().Be(HttpStatusCode.NoContent);
    }
}
