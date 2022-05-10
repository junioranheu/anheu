using System.ComponentModel.DataAnnotations;

namespace Anheu.API.Models
{
    public class MateriaTag
    {
        [Key]
        public int MateriaTagId { get; set; }

        // Fk (De lá pra cá);
        public int MateriaId { get; set; }
        public Materia Materias { get; set; }

        public string? Tag { get; set; }
    }
}
