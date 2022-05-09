using System.ComponentModel.DataAnnotations;

namespace Anheu.API.Models
{
    public class AulaTiming
    {
        [Key]
        public int AulaTimingId { get; set; }

        // Fk (De lá pra cá);
        public int AulaId { get; set; }
        public Aula Aula { get; set; }

        public string Titulo { get; set; }
        public string TempoEmSegundos { get; set; }
    }
}
