using System.ComponentModel.DataAnnotations;

namespace Anheu.API.Models
{
    public class Aula
    {
        [Key]
        public int AulaId { get; set; }

        // Fk (De lá pra cá);
        public int MateriaId { get; set; }
        public Materia Materias { get; set; }

        public string Nome { get; set; }
        public string Thumbnail { get; set; }
        public string Video { get; set; }
        public string Professor { get; set; }
        public string ResumoAula { get; set; }

        public DateTime? DataRegistro { get; set; }
        public int IsAtivo { get; set; }
    }
}
