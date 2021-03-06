using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Anheu.API.Models
{
    public class Disciplina
    {
        [Key]
        public int DisciplinaId { get; set; }
        public string? Nome { get; set; }
        public string? Subtitulo { get; set; }
        public DateTime? DataRegistro { get; set; }
        public int IsAtivo { get; set; }

        // Fk (De cá pra lá);
        public ICollection<DisciplinaTag> DisciplinaTags { get; set; }

        // Fk (De cá pra lá);
        [JsonIgnore]
        public ICollection<Aula> Aulas { get; set; }
    }
}
