using System.ComponentModel.DataAnnotations;

namespace Anheu.API.Models
{
    public class PostCategoria
    {
        [Key]
        public int PostCategoriaId { get; set; }
        public string? Categoria { get; set; }
        public string? Imagem { get; set; }
        public int QtdPosts { get; set; } // Valor setado na hora da busca apenas;
        public int IsAtivo { get; set; }
        public DateTime DataCriacao { get; set; }
    }
}
