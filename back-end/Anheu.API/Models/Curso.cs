using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Anheu.API.Models
{
    public class Curso
    {
        [Key]
        public int CursoId { get; set; }

        public string? Nome { get; set; }
        public string? Thumbnail { get; set; }
        public string? Professor { get; set; }
        public string? ResumoCurso { get; set; }

        public double? Preco { get; set; }

        public DateTime? DataRegistro { get; set; }
        public int IsAtivo { get; set; }

        // Fk (De cá pra lá);
        [JsonIgnore]
        public ICollection<CursoDisciplina> CursosDisciplinas { get; set; }
    }
}
