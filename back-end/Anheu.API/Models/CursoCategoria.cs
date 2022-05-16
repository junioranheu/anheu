using System.ComponentModel.DataAnnotations;

namespace Anheu.API.Models
{
    public class CursoCategoria
    {
        [Key]
        public int CursoCategoriaId { get; set; }
        public string? Categoria { get; set; }
        public string? Abreviacao { get; set; }
        public string? Descricao { get; set; }
        public int IsAtivo { get; set; }
        public DateTime DataCriacao { get; set; }
    }
}
