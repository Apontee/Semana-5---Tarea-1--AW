using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        // Servicio para manejar la lógica de negocio
        private readonly IProductoService _servicio;

        public ProductosController(IProductoService servicio)
        {
            _servicio = servicio;
        }

        // GET: api/Productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductoDto>>> ObtenerTodos()
        {
            return Ok(await _servicio.GetAllAsync());
        }

        // GET: api/Productos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductoDto>> ObtenerPorId(int id)
        {
            var producto = await _servicio.GetByIdAsync(id);
            if (producto == null) return NotFound();
            return Ok(producto);
        }

        // POST: api/Productos
        [HttpPost]
        [ValidateAntiForgeryToken] // Protegemos contra ataques CSRF
        public async Task<ActionResult<ProductoDto>> Crear(CreateProductoDto datos)
        {
            var creado = await _servicio.CreateAsync(datos);
            return CreatedAtAction(nameof(ObtenerPorId), new { id = creado.Id }, creado);
        }

        // PUT: api/Productos/5
        [HttpPut("{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Editar(int id, UpdateProductoDto datos)
        {
            if (id <= 0) return BadRequest();
            
            var existente = await _servicio.GetByIdAsync(id);
            if (existente == null) return NotFound();

            await _servicio.UpdateAsync(id, datos);
            return NoContent();
        }

        // DELETE: api/Productos/5
        [HttpDelete("{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Eliminar(int id)
        {
            var existente = await _servicio.GetByIdAsync(id);
            if (existente == null) return NotFound();

            await _servicio.DeleteAsync(id);
            return NoContent();
        }
    }
}
