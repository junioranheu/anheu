using Anheu.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Anheu.API.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
            //
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<UsuarioTipo> UsuariosTipos { get; set; }
        public DbSet<UsuarioInformacao> UsuariosInformacoes { get; set; }

        public DbSet<CursoCategoria> CursosCategorias { get; set; }
        public DbSet<Curso> Cursos { get; set; }
        public DbSet<Disciplina> Disciplinas { get; set; }
        public DbSet<DisciplinaTag> DisciplinaTags { get; set; }
        public DbSet<CursoDisciplina> CursosDisciplinas { get; set; }

        public DbSet<Aula> Aulas { get; set; }
        public DbSet<AulaTiming> AulaTimings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
