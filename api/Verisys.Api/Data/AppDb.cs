using Microsoft.EntityFrameworkCore;
using Verisys.Api.Models;
namespace Verisys.Api.Data
{
    public class AppDb : DbContext
    {
        public AppDb(DbContextOptions<AppDb> o) : base(o) { }
        public DbSet<TaskItem> Tasks => Set<TaskItem>();
    }
}
