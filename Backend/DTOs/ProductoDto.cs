namespace Backend.DTOs
{
    public class ProductoDto
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public decimal Precio { get; set; }
        public int Stock { get; set; }
    }

    public class CreateProductoDto
    {
        public required string Nombre { get; set; }
        public decimal Precio { get; set; }
        public int Stock { get; set; }
    }

    public class UpdateProductoDto
    {
        public required string Nombre { get; set; }
        public decimal Precio { get; set; }
        public int Stock { get; set; }
    }
}
