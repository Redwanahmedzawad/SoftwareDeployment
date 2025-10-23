using Microsoft.EntityFrameworkCore;
using Verisys.Api.Data;
using Verisys.Api.Models;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.ApplicationInsights.AspNetCore.Extensions;

var builder = WebApplication.CreateBuilder(args);

// ----- Connection string (appsettings OR env var) -----
var conn =
    builder.Configuration.GetConnectionString("Default") ??
    Environment.GetEnvironmentVariable("ConnectionStrings__Default");

if (string.IsNullOrWhiteSpace(conn))
{
    throw new InvalidOperationException(
        "ConnectionStrings__Default is not configured. " +
        "Set it in appsettings.json for local, or as an App Setting in Azure.");
}

// ----- Services -----
builder.Services.AddDbContext<AppDb>(o => o.UseNpgsql(conn));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationInsightsTelemetry();
builder.Services.Configure<ApplicationInsightsServiceOptions>(o =>
{
    o.EnableAdaptiveSampling = true;
    o.EnableEventCounterCollectionModule = true;
});



var app = builder.Build();

// ----- Health endpoint (for pipeline/startup probes) -----
app.MapGet("/healthz", () => Results.Ok("Healthy"));

// ----- Static files: serve the Vue build from wwwroot at '/' -----
app.UseDefaultFiles();   // looks for index.html
app.UseStaticFiles();    // serves wwwroot/**

// ----- Swagger (Dev by default, toggle in Prod via EnableSwagger=true) -----
var enableSwagger = app.Configuration.GetValue("EnableSwagger", false);
if (app.Environment.IsDevelopment() || enableSwagger)
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Verisys API v1");
        c.RoutePrefix = "swagger";
    });
}

// ----- Minimal API CRUD -----
app.MapGet("/api/tasks", async (AppDb db) =>
    await db.Tasks.AsNoTracking().ToListAsync().ConfigureAwait(false));

app.MapPost("/api/tasks", async (AppDb db, TaskItem task) =>
{
    db.Add(task);
    await db.SaveChangesAsync().ConfigureAwait(false);
    return Results.Created($"/api/tasks/{task.Id}", task);
});

app.MapPut("/api/tasks/{id:int}", async (int id, AppDb db, TaskItem updated) =>
{
    var existing = await db.Tasks.FirstOrDefaultAsync(t => t.Id == id).ConfigureAwait(false);
    if (existing is null) return Results.NotFound();
    db.Entry(existing).CurrentValues.SetValues(updated);
    await db.SaveChangesAsync().ConfigureAwait(false);
    return Results.NoContent();
});

app.MapDelete("/api/tasks/{id:int}", async (int id, AppDb db) =>
{
    var existing = await db.Tasks.FirstOrDefaultAsync(t => t.Id == id).ConfigureAwait(false);
    if (existing is null) return Results.NotFound();
    db.Remove(existing);
    await db.SaveChangesAsync().ConfigureAwait(false);
    return Results.NoContent();
});

// ----- Optional: migrations on startup (guarded) -----
// Set App Setting MIGRATE_DB=true in envs where you want this to run.
if (string.Equals(Environment.GetEnvironmentVariable("MIGRATE_DB"), "true", StringComparison.OrdinalIgnoreCase))
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDb>();
    try
    {
        db.Database.Migrate();
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "Database migration failed at startup.");
        // Don't crash the app; /healthz and static hosting still work
    }
}

// ----- SPA fallback: send unknown routes to index.html (Vue Router) -----
app.MapFallbackToFile("/index.html");

app.Run();

public partial class Program { } // for tests
