using FluentAssertions;
using Verisys.Api.Models;

public class TasksTests
{
    [Fact]
    public void Create_TaskItem_Defaults()
    {
        var t = new TaskItem(0, "Hello", "todo");
        t.Title.Should().Be("Hello");
        t.Status.Should().Be("todo");
    }
}
