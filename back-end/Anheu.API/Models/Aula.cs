using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Anheu.API.Models
{
    public class Aula
    {
        [Key]
        public int AulaId { get; set; }

        // Fk (De lá pra cá);
        public int DisciplinaId { get; set; }
        // public Disciplina Disciplinas { get; set; }

        public string? Nome { get; set; }
        public string? Thumbnail { get; set; }
        public string? Video { get; set; }
        public string? ResumoAula { get; set; }

        public DateTime? DataRegistro { get; set; }
        public int IsAtivo { get; set; }

        // Fk (De cá pra lá);
        [JsonIgnore]
        public ICollection<AulaTiming> AulasTimings { get; set; }
    }
}
