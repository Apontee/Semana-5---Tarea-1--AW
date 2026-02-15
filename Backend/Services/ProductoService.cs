using Backend.DTOs;
using Backend.Models;
using Backend.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class ProductoService : IProductoService
    {
        // Repositorio para acceder a los datos
        private readonly IProductoRepository _repositorio;

        public ProductoService(IProductoRepository repositorio)
        {
            _repositorio = repositorio;
        }

        public async Task<IEnumerable<ProductoDto>> GetAllAsync()
        {
            var productos = await _repositorio.GetAllAsync();
            // Convertimos la entidad a DTO (Data Transfer Object)
            return productos.Select(p => new ProductoDto
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Precio = p.Precio,
                Stock = p.Stock
            });
        }

        public async Task<ProductoDto?> GetByIdAsync(int id)
        {
            var p = await _repositorio.GetByIdAsync(id);
            if (p == null) return null;

            return new ProductoDto
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Precio = p.Precio,
                Stock = p.Stock
            };
        }

        public async Task<ProductoDto> CreateAsync(CreateProductoDto datos)
        {
            var producto = new Producto
            {
                Nombre = datos.Nombre,
                Precio = datos.Precio,
                Stock = datos.Stock
            };

            var creado = await _repositorio.AddAsync(producto);

            return new ProductoDto
            {
                Id = creado.Id,
                Nombre = creado.Nombre,
                Precio = creado.Precio,
                Stock = creado.Stock
            };
        }

        public async Task UpdateAsync(int id, UpdateProductoDto datos)
        {
            var producto = await _repositorio.GetByIdAsync(id);
            if (producto != null)
            {
                producto.Nombre = datos.Nombre;
                producto.Precio = datos.Precio;
                producto.Stock = datos.Stock;
                await _repositorio.UpdateAsync(producto);
            }
        }

        public async Task DeleteAsync(int id)
        {
            await _repositorio.DeleteAsync(id);
        }
    }
}
