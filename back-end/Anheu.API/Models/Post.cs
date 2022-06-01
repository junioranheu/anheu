using System.ComponentModel.DataAnnotations;

namespace Anheu.API.Models
{
    public class Post
    {
        [Key]
        public int PostId { get; set; }

        public string? Titulo { get; set; }
        public string? ConteudoPost { get; set; }

        // Fk (De lá pra cá);
        public int UsuarioId { get; set; }
        public Usuario? Usuarios { get; set; }

        public DateTime? DataRegistro { get; set; }
        public int IsAtivo { get; set; }

        // Fk (De lá pra cá);
        public int PostCategoriaId { get; set; }
        public PostCategoria? PostCategorias { get; set; }
    }
}
