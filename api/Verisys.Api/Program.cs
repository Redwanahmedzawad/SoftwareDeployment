using Microsoft.EntityFrameworkCore;
using Verisys.Api.Data;
using Verisys.Api.Models;

var builder = WebApplication.CreateBuilder(args);

// ---- Connection string (robust) ----
var conn =
    builder.Configuration.GetConnectionString("Default") ??
    Environment.GetEnvironmentVariable("ConnectionStrings__Default");

if (string.IsNullOrWhiteSpace(conn))
{
    throw new InvalidOperationException(
        "ConnectionStrings__Default is not configured. " +
        "Set it in appsettings.json for local or as an App Setting in Azure.");
}

// ---- Services ----
builder.Services.AddDbContext<AppDb>(o => o.UseNpgsql(conn));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ---- Swagger (Dev only) ----
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ---- Health endpoint (used by your pipeline) ----
app.MapGet("/healthz", () => Results.Ok("Healthy"));

// ---- Minimal API CRUD ----
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

// ---- Optional: run migrations on startup (guarded) ----
// Set an App Setting MIGRATE_DB=true in environments where you want this to run.
if (string.Equals(Environment.GetEnvironmentVariable("MIGRATE_DB"), "true", StringComparison.OrdinalIgnoreCase))
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDb>();
    db.Database.Migrate();
}

app.Run();

public partial class Program { } // for tests
