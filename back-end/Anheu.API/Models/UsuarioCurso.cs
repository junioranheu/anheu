using System.ComponentModel.DataAnnotations;

namespace Anheu.API.Models
{
    public class UsuarioCurso
    {
        [Key]
        public int UsuarioCursoId { get; set; }

        // Fk (De lá pra cá);
        public int UsuarioId { get; set; }
        public Usuario? Usuarios { get; set; }

        // Fk (De lá pra cá);
        public int CursoId { get; set; }
        public Curso? Cursos { get; set; }

        public int IsAtivo { get; set; }
        public DateTime DataRegistro { get; set; }
    }
}
