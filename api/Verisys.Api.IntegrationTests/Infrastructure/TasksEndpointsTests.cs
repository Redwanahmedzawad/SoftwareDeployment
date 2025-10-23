using System.Net;                // HttpStatusCode
using System.Net.Http;           // HttpClient
using System.Net.Http.Json;      // PostAsJsonAsync / ReadFromJsonAsync
using System.Threading.Tasks;    // Task / async
using FluentAssertions;
using Verisys.Api.IntegrationTests.Infrastructure; // if the test is in Endpoints folder and factory is in Infrastructure
using Xunit;

namespace Verisys.Api.IntegrationTests.Endpoints;

public class TasksEndpointsTests : IClassFixture<TestAppFactory>
{
    private readonly HttpClient _client;

    public TasksEndpointsTests(TestAppFactory factory) => _client = factory.CreateClient();

    [Fact]
    public async Task Get_InitiallyEmpty()
    {
        var res = await _client.GetAsync("/api/tasks");
        res.StatusCode.Should().Be(HttpStatusCode.OK);

        var data = await res.Content.ReadFromJsonAsync<List<dynamic>>();
        data.Should().NotBeNull();
        data!.Count.Should().Be(0);
    }

    [Fact]
    public async Task Post_Then_Get_ReturnsCreatedItem()
    {
        var create = new { id = 0, title = "Write tests", status = "todo" };
        var post = await _client.PostAsJsonAsync("/api/tasks", create);
        post.StatusCode.Should().Be(HttpStatusCode.Created);

        var list = await _client.GetFromJsonAsync<List<dynamic>>("/api/tasks");
        list!.Count.Should().Be(1);
        ((string)list[0].title).Should().Be("Write tests");
        ((string)list[0].status).Should().Be("todo");
    }

    [Fact]
    public async Task Put_UpdatesItem()
    {
        var create = new { id = 0, title = "Do it", status = "todo" };
        var post = await _client.PostAsJsonAsync("/api/tasks", create);
        var created = await post.Content.ReadFromJsonAsync<dynamic>();
        int id = (int)created.id;

        var update = new { id, title = "Do it now", status = "in-progress" };
        var put = await _client.PutAsJsonAsync($"/api/tasks/{id}", update);
        put.StatusCode.Should().Be(HttpStatusCode.NoContent);

        var get = await _client.GetAsync($"/api/tasks/{id}");
        get.StatusCode.Should().Be(HttpStatusCode.OK);
        var item = await get.Content.ReadFromJsonAsync<dynamic>();
        ((string)item.title).Should().Be("Do it now");
        ((string)item.status).Should().Be("in-progress");
    }

    [Fact]
    public async Task Delete_RemovesItem()
    {
        var post = await _client.PostAsJsonAsync("/api/tasks", new { id = 0, title = "temp", status = "todo" });
        var created = await post.Content.ReadFromJsonAsync<dynamic>();
        int id = (int)created.id;

        var del = await _client.DeleteAsync($"/api/tasks/{id}");
        del.StatusCode.Should().Be(HttpStatusCode.NoContent);

        var res = await _client.GetAsync($"/api/tasks/{id}");
        res.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}
