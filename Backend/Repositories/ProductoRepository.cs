using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public class ProductoRepository : IProductoRepository
    {
        private readonly ApplicationDbContext _contexto;

        public ProductoRepository(ApplicationDbContext contexto)
        {
            _contexto = contexto;
        }

        public async Task<IEnumerable<Producto>> GetAllAsync()
        {
            return await _contexto.Productos.ToListAsync();
        }

        public async Task<Producto?> GetByIdAsync(int id)
        {
            return await _contexto.Productos.FindAsync(id);
        }

        public async Task<Producto> AddAsync(Producto entidad)
        {
            _contexto.Productos.Add(entidad);
            await _contexto.SaveChangesAsync();
            return entidad;
        }

        public async Task UpdateAsync(Producto entidad)
        {
            _contexto.Productos.Update(entidad);
            await _contexto.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entidad = await _contexto.Productos.FindAsync(id);
            if (entidad != null)
            {
                _contexto.Productos.Remove(entidad);
                await _contexto.SaveChangesAsync();
            }
        }
    }
}
