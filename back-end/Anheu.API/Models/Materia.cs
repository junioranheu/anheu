using System.ComponentModel.DataAnnotations;

namespace Anheu.API.Models
{
    public class Materia
    {
        [Key]
        public int MateriaId { get; set; }
        public string? Nome { get; set; }
        public string? Subtitulo { get; set; }
        public string? Thumbnail { get; set; }
        public DateTime? DataRegistro { get; set; }
        public int IsAtivo { get; set; }

        // Fk (De cá pra lá);
        public ICollection<MateriaTag> MateriaTags { get; set; }

        // Fk (De cá pra lá);
        public ICollection<Aula> Aulas { get; set; }
    }
}
