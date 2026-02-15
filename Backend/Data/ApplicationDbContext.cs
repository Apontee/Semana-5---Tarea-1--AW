using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Producto> Productos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Producto>()
                .Property(p => p.Precio)
                .HasColumnType("decimal(18,2)");

            // Seeding Usuario Admin
            modelBuilder.Entity<Usuario>().HasData(new Usuario
            {
                Id = 1,
                Email = "admin@prueba.com",
                Password = BCrypt.Net.BCrypt.HashPassword("admin123")
            });
        }
    }
}
