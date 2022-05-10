using System.ComponentModel.DataAnnotations;

namespace Anheu.API.Models
{
    public class DisciplinaTag
    {
        [Key]
        public int DisciplinaTagId { get; set; }

        // Fk (De lá pra cá);
        public int DisciplinaId { get; set; }
        public Disciplina Disciplinas { get; set; }

        public string? Tag { get; set; }
    }
}
