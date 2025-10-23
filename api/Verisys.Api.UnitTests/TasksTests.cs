using Verisys.Api.Models;
using FluentAssertions;
using Xunit;

namespace Verisys.Api.UnitTests
{
    public class TasksTests
    {
        [Fact]
        public void Task_Creation_Should_Set_Properties()
        {
            // Arrange & Act
            var task = new TaskItem(1, "Test Task", "todo");

            // Assert
            task.Id.Should().Be(1);
            task.Title.Should().Be("Test Task");
            task.Status.Should().Be("todo");
        }

        [Fact]
        public void Task_With_Different_Status_Should_Be_Created()
        {
            // Arrange & Act
            var task = new TaskItem(1, "Test Task", "done");

            // Assert
            task.Status.Should().Be("done");
        }

        [Fact]
        public void Task_Creation_Should_Handle_Empty_Title()
        {
            // Arrange & Act
            var task = new TaskItem(1, "", "todo");

            // Assert
            task.Title.Should().BeEmpty();
        }

        [Theory]
        [InlineData("todo")]
        [InlineData("in-progress")]
        [InlineData("done")]
        public void Task_Should_Accept_Valid_Status(string status)
        {
            // Arrange & Act
            var task = new TaskItem(1, "Test Task", status);

            // Assert
            task.Status.Should().Be(status);
        }
    }
}