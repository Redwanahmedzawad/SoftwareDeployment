using System.Linq;
using Microsoft.AspNetCore.Hosting;          // keep this
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Verisys.Api.Data;

namespace Verisys.Api.IntegrationTests.Infrastructure;

public class TestAppFactory : WebApplicationFactory<Program>
{
    private SqliteConnection? _conn;

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder
            // set env without extension method
            .UseSetting(WebHostDefaults.EnvironmentKey, "Testing")
            .ConfigureServices(services =>
            {
                var descriptor = services.Single(d => d.ServiceType == typeof(DbContextOptions<AppDb>));
                services.Remove(descriptor);

                _conn = new SqliteConnection("DataSource=:memory:");
                _conn.Open();

                services.AddDbContext<AppDb>(o => o.UseSqlite(_conn));

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
