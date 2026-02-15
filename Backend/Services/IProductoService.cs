using Backend.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface IProductoService
    {
        Task<IEnumerable<ProductoDto>> GetAllAsync();
        Task<ProductoDto?> GetByIdAsync(int id);
        Task<ProductoDto> CreateAsync(CreateProductoDto createDto);
        Task UpdateAsync(int id, UpdateProductoDto updateDto);
        Task DeleteAsync(int id);
    }
}
