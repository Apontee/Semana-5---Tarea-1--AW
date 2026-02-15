using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        
        [Required]
        public required string Password { get; set; } // Hashed
    }
}
