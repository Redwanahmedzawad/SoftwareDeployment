using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;  // <-- required
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Verisys.Api.Data;   // AppDb
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

    public TasksEndpointsTests(TestAppFactory factory) => _client = factory.CreateClient();

    [Fact]
    public async Task GetTasksInitiallyEmpty()
    {
        var res = await _client.GetAsync(new Uri("/api/tasks", UriKind.Relative));
        res.StatusCode.Should().Be(HttpStatusCode.OK);

        var data = await res.Content.ReadFromJsonAsync<List<object>>();
        data.Should().NotBeNull();
        data!.Count.Should().Be(0);
    }
}
