using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Verisys.Api.Data;
using Verisys.Api.Models;

namespace Verisys.Api.UnitTests;

public class TaskItemTests
{
    [Fact]
    public void Create_TaskItem_WithAllProperties()
    {
        var task = new TaskItem(1, "Test Task", "todo");
        
        task.Id.Should().Be(1);
        task.Title.Should().Be("Test Task");
        task.Status.Should().Be("todo");
        
    }

    [Fact]
    public void TaskItem_IsImmutable()
    {
        var task1 = new TaskItem(1, "Test", "todo");
        var task2 = task1 with { Status = "done" };
        
        task1.Status.Should().Be("todo");
        task2.Status.Should().Be("done");
        task1.Id.Should().Be(task2.Id);
        task1.Title.Should().Be(task2.Title);
    }

    [Theory]
    [InlineData("todo")]
    [InlineData("in-progress")]
    [InlineData("done")]
    public void TaskItem_SupportsVariousStatuses(string status)
    {
        var task = new TaskItem(1, "Test", status);
        task.Status.Should().Be(status);
    }
}

public class AppDbTests
{
    private AppDb CreateInMemoryDb()
    {
        var options = new DbContextOptionsBuilder<AppDb>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        
        return new AppDb(options);
    }

    [Fact]
    public async Task AddTask_SavesSuccessfully()
    {
        using var db = CreateInMemoryDb();
        var task = new TaskItem(0, "New Task", "todo");
        
        db.Tasks.Add(task);
        await db.SaveChangesAsync();
        
        var tasks = await db.Tasks.ToListAsync();
        tasks.Should().HaveCount(1);
        tasks[0].Title.Should().Be("New Task");
        tasks[0].Status.Should().Be("todo");
    }

    [Fact]
    public async Task UpdateTask_ModifiesExistingTask()
    {
        using var db = CreateInMemoryDb();
        var task = new TaskItem(0, "Original Title", "todo");
        db.Tasks.Add(task);
        await db.SaveChangesAsync();
        
        var savedTask = await db.Tasks.FirstAsync();
        var updatedTask = savedTask with { Status = "done" };
        db.Entry(savedTask).CurrentValues.SetValues(updatedTask);
        await db.SaveChangesAsync();
        
        var result = await db.Tasks.FirstAsync();
        result.Status.Should().Be("done");
        result.Title.Should().Be("Original Title");
    }

    [Fact]
    public async Task DeleteTask_RemovesFromDatabase()
    {
        using var db = CreateInMemoryDb();
        var task = new TaskItem(0, "To Delete", "todo");
        db.Tasks.Add(task);
        await db.SaveChangesAsync();
        
        var savedTask = await db.Tasks.FirstAsync();
        db.Tasks.Remove(savedTask);
        await db.SaveChangesAsync();
        
        var tasks = await db.Tasks.ToListAsync();
        tasks.Should().BeEmpty();
    }

    [Fact]
    public async Task GetAllTasks_ReturnsMultipleTasks()
    {
        using var db = CreateInMemoryDb();
        db.Tasks.AddRange(
            new TaskItem(0, "Task 1", "todo"),
            new TaskItem(0, "Task 2", "in-progress"),
            new TaskItem(0, "Task 3", "done")
        );
        await db.SaveChangesAsync();
        
        var tasks = await db.Tasks.AsNoTracking().ToListAsync();
        tasks.Should().HaveCount(3);
        tasks.Should().Contain(t => t.Title == "Task 1");
        tasks.Should().Contain(t => t.Status == "in-progress");
    }
}
