using FluentAssertions;
using Verisys.Api.Models;
using Xunit;

namespace Verisys.Api.UnitTests.Models;

public class TaskItemTests
{
    [Fact]
    public void Record_Ctor_Sets_Properties()
    {
        var t = new TaskItem(1, "Hello", "todo");
        t.Id.Should().Be(1);
        t.Title.Should().Be("Hello");
        t.Status.Should().Be("todo");
    }

    [Fact]
    public void With_Expression_Creates_Modified_Copy()
    {
        var t1 = new TaskItem(1, "Hello", "todo");
        var t2 = t1 with { Status = "done" };

        t2.Should().NotBeSameAs(t1);
        t2.Status.Should().Be("done");
        t1.Status.Should().Be("todo");
    }

    [Fact]
    public void Value_Equality_Works_For_Records()
    {
        var a = new TaskItem(1, "Same", "todo");
        var b = new TaskItem(1, "Same", "todo");
        a.Equals(b).Should().BeTrue();
        a.GetHashCode().Should().Be(b.GetHashCode());
    }
}
