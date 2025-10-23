using Microsoft.EntityFrameworkCore;
using Verisys.Api.Data;
using Verisys.Api.Models;

var builder = WebApplication.CreateBuilder(args);

// DB
builder.Services.AddDbContext<AppDb>(o =>
    o.UseNpgsql(builder.Configuration.GetConnectionString("Postgres")));

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var defaultConnection = builder.Configuration.GetConnectionString("Default")
    ?? Environment.GetEnvironmentVariable("ConnectionStrings__Default");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(defaultConnection));


var app = builder.Build();

// Swagger in Dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Minimal API endpoints
app.MapGet("/api/tasks", async (AppDb db) =>
    await db.Tasks.ToListAsync().ConfigureAwait(false));

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

// Dev convenience: migrate DB on startup (safe for local)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDb>();
    db.Database.Migrate();
}

app.Run();

public partial class Program { } // for tests
