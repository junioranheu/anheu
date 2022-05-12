using System.ComponentModel.DataAnnotations;

namespace Anheu.API.Models
{
    public class CursoDisciplina
    {
        [Key]
        public int CursoDisciplinaId { get; set; }

        // Fk (De lá pra cá);
        public int CursoId { get; set; }
        public Curso? Cursos { get; set; }

        // Fk (De lá pra cá);
        public int DisciplinaId { get; set; }
        public Disciplina? Disciplinas { get; set; }

        public int IsAtivo { get; set; }
        public DateTime DataRegistro { get; set; }
    }
}
