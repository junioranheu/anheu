using Anheu.API.Models;
using static Anheu.Biblioteca.Biblioteca;

namespace Anheu.API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(Context context)
        {
            // Exclui o esquema, copia as queries, cria esquema/tabelas, popula o BD;
            bool resetarBd = false;
            if (resetarBd)
            {
                context.Database.EnsureDeleted(); // Excluir o esquema e as tabelas;
                // string sqlErro = context.Database.GenerateCreateScript(); // Query para criar as tabelas;
                context.Database.EnsureCreated(); // Recriar o esquema e as tabelas;

                Seed(context);
            }
        }

        public static void Seed(Context context)
        {
            // Hora atual;
            DateTime dataAgora = HorarioBrasilia();

            #region seed_usuarios
            if (!context.UsuariosTipos.Any())
            {
                context.UsuariosTipos.Add(new UsuarioTipo() { UsuarioTipoId = 1, Tipo = "Administrador", Descricao = "Administrador do sistema", IsAtivo = 1, DataCriacao = dataAgora });
                context.UsuariosTipos.Add(new UsuarioTipo() { UsuarioTipoId = 2, Tipo = "Usuário", Descricao = "Usuário comum", IsAtivo = 1, DataCriacao = dataAgora });
            }

            if (!context.Usuarios.Any())
            {
                context.Usuarios.Add(new Usuario() { UsuarioId = 1, NomeCompleto = "Adm Anheu", Email = "adm@Hotmail.com", NomeUsuarioSistema = "adm", Senha = Criptografar("123"), DataCriacao = dataAgora, UsuarioTipoId = 1, Foto = "", IsAtivo = 1, IsPremium = 1, IsVerificado = 1 });
                context.Usuarios.Add(new Usuario() { UsuarioId = 2, NomeCompleto = "Junior", Email = "juninholorena@Hotmail.com", NomeUsuarioSistema = "junioranheu", Senha = Criptografar("123"), DataCriacao = dataAgora, UsuarioTipoId = 2, Foto = "", IsAtivo = 1, IsPremium = 1, IsVerificado = 1 });
                context.Usuarios.Add(new Usuario() { UsuarioId = 3, NomeCompleto = "Usuário", Email = "usuario@Hotmail.com", NomeUsuarioSistema = "usuario", Senha = Criptografar("123"), DataCriacao = dataAgora, UsuarioTipoId = 2, Foto = "", IsAtivo = 1, IsPremium = 1, IsVerificado = 1 });
            }

            if (!context.UsuariosInformacoes.Any())
            {
                context.UsuariosInformacoes.Add(new UsuarioInformacao()
                {
                    UsuarioInformacaoId = 1,
                    UsuarioId = 2,
                    Genero = 1,
                    DataAniversario = dataAgora,
                    CPF = "44571955880",
                    Telefone = "12 98271-3939",
                    Rua = "José Benedito Ferrari",
                    NumeroResidencia = "480",
                    CEP = "12605-110",
                    Bairro = "Vila Passos",
                    DataUltimaAlteracao = null
                });
            }
            #endregion

            #region seed_cursos_disciplinas_e_aulas
            if (!context.CursosCategorias.Any())
            {
                context.CursosCategorias.Add(new CursoCategoria() { CursoCategoriaId = 1, Categoria = "Desenvolvimento de software", Abreviacao = "DEV", Descricao = "xxx", Imagem = "1.webp", IsAtivo = 1, DataCriacao = dataAgora });
                context.CursosCategorias.Add(new CursoCategoria() { CursoCategoriaId = 2, Categoria = "Banco de dados", Abreviacao = "BDA", Descricao = "xxx", Imagem = "2.webp", IsAtivo = 1, DataCriacao = dataAgora });
                context.CursosCategorias.Add(new CursoCategoria() { CursoCategoriaId = 3, Categoria = "Infraestrutura e redes", Abreviacao = "Infra", Descricao = "xxx", Imagem = "3.webp", IsAtivo = 1, DataCriacao = dataAgora });
                context.CursosCategorias.Add(new CursoCategoria() { CursoCategoriaId = 4, Categoria = "Design", Abreviacao = "Design", Descricao = "xxx", Imagem = "4.webp", IsAtivo = 1, DataCriacao = dataAgora });
                context.CursosCategorias.Add(new CursoCategoria() { CursoCategoriaId = 5, Categoria = "Ciências de dados e IA", Abreviacao = "Data", Descricao = "xxx", Imagem = "5.webp", IsAtivo = 1, DataCriacao = dataAgora });
                context.CursosCategorias.Add(new CursoCategoria() { CursoCategoriaId = 6, Categoria = "Gestão de TI", Abreviacao = "GTI", Descricao = "xxx", Imagem = "6.webp", IsAtivo = 1, DataCriacao = dataAgora });
                context.CursosCategorias.Add(new CursoCategoria() { CursoCategoriaId = 7, Categoria = "Business Inteligence", Abreviacao = "BI", Descricao = "xxx", Imagem = "7.webp", IsAtivo = 1, DataCriacao = dataAgora });
            }

            if (!context.Cursos.Any())
            {
                context.Cursos.Add(new Curso() { CursoId = 1, Nome = "Javascript pro", Thumbnail = "1.webp", Professor = "Israel", ResumoCurso = "Lorem ipsum dolor sit amet. Qui reiciendis ratione non laborum odio non minima neque in enim rerum. ", Preco = 99.99, DataRegistro = dataAgora, CursoCategoriaId = 1, IsAtivo = 1 });
                context.Cursos.Add(new Curso() { CursoId = 2, Nome = "Fullstack em 1 semana", Thumbnail = "2.webp", Professor = "Junior Souza", ResumoCurso = "Vel officia veritatis aut quia cumque in dolorem illo qui fugit temporibus est nihil labore et expedita ipsa. Ut dolores molestiae vel alias natus a nesciunt galisum sit quia ipsum nam laboriosam sint.", Preco = 2.99, DataRegistro = dataAgora, CursoCategoriaId = 1, IsAtivo = 1 });
                context.Cursos.Add(new Curso() { CursoId = 3, Nome = "Banco de dados para hackers", Thumbnail = "3.webp", Professor = "dos deuses", ResumoCurso = "Sit quaerat eligendi non nihil dolore ut libero voluptatem aut omnis facilis. Hic rerum asperiores et quam veritatis et illum quas qui accusamus totam et error impedit in necessitatibus molestias.", Preco = 50, DataRegistro = dataAgora, CursoCategoriaId = 2, IsAtivo = 1 });
                context.Cursos.Add(new Curso() { CursoId = 4, Nome = "Java trash", Thumbnail = "4.webp", Professor = "Willians Carvalho", ResumoCurso = "Sit laudantium dolorem rem illo optio qui galisum nulla est possimus veritatis qui vitae vitae non odit sequi ut velit dolor?", Preco = 0.0, DataRegistro = dataAgora, CursoCategoriaId = 1, IsAtivo = 1 });
                context.Cursos.Add(new Curso() { CursoId = 5, Nome = "Testes unitários com console.log", Thumbnail = "5.webp", Professor = "Professor indiano", ResumoCurso = "Aut dolorem placeat sit perspiciatis reiciendis non modi voluptatem qui voluptatibus doloribus et fugit blanditiis ut neque voluptatem qui eligendi quia.", Preco = 20.90, DataRegistro = dataAgora, CursoCategoriaId = 1, IsAtivo = 1 });
            }

            if (!context.Disciplinas.Any())
            {
                context.Disciplinas.Add(new Disciplina() { DisciplinaId = 1, Nome = "HTML e CSS", Subtitulo = "Uma introdução ao front-end", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Disciplinas.Add(new Disciplina() { DisciplinaId = 2, Nome = "Javascript", Subtitulo = "JQuery morreu. RIP", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Disciplinas.Add(new Disciplina() { DisciplinaId = 3, Nome = "React.js", Subtitulo = "By Mark Zuckerberg", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Disciplinas.Add(new Disciplina() { DisciplinaId = 4, Nome = "SQL Server e MySQL", Subtitulo = "Delete sem Where", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Disciplinas.Add(new Disciplina() { DisciplinaId = 5, Nome = "Back-end", Subtitulo = "Vai conseguir programar sem o StackOverFlow", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Disciplinas.Add(new Disciplina() { DisciplinaId = 6, Nome = "xUnit", Subtitulo = "Para testar sem console.log()", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Disciplinas.Add(new Disciplina() { DisciplinaId = 7, Nome = "Lógica de programação", Subtitulo = "Para QI's maiores que 3", DataRegistro = dataAgora, IsAtivo = 1 });
            }

            if (!context.DisciplinaTags.Any())
            {
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 1, DisciplinaId = 1, Tag = "#HTML5" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 2, DisciplinaId = 1, Tag = "#CSS3" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 3, DisciplinaId = 1, Tag = "#DOM" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 4, DisciplinaId = 1, Tag = "#Iniciante" });

                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 5, DisciplinaId = 2, Tag = "#JS" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 6, DisciplinaId = 2, Tag = "#Vanilla" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 7, DisciplinaId = 2, Tag = "#JQuery" });

                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 8, DisciplinaId = 3, Tag = "#JS" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 9, DisciplinaId = 3, Tag = "#React.js" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 10, DisciplinaId = 3, Tag = "#Hooks" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 11, DisciplinaId = 3, Tag = "#Visual Studio Code" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 12, DisciplinaId = 3, Tag = "#Next.js" });

                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 13, DisciplinaId = 4, Tag = "#Banco de dados" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 14, DisciplinaId = 4, Tag = "#SQL Server" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 15, DisciplinaId = 4, Tag = "#MySQL" });

                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 16, DisciplinaId = 5, Tag = "#Back-end" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 17, DisciplinaId = 5, Tag = "#CSharp" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 18, DisciplinaId = 5, Tag = "#Java" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 19, DisciplinaId = 5, Tag = "#API" });

                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 20, DisciplinaId = 6, Tag = "#Testes" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 21, DisciplinaId = 6, Tag = "#xUnit" });

                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 22, DisciplinaId = 7, Tag = "#Lógica" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 23, DisciplinaId = 7, Tag = "#Back-end" });
            }

            if (!context.CursosDisciplinas.Any())
            {
                context.CursosDisciplinas.Add(new CursoDisciplina() { CursoDisciplinaId = 1, CursoId = 1, DisciplinaId = 1, IsAtivo = 1, DataRegistro = dataAgora });
                context.CursosDisciplinas.Add(new CursoDisciplina() { CursoDisciplinaId = 2, CursoId = 1, DisciplinaId = 2, IsAtivo = 1, DataRegistro = dataAgora });
                context.CursosDisciplinas.Add(new CursoDisciplina() { CursoDisciplinaId = 3, CursoId = 1, DisciplinaId = 3, IsAtivo = 1, DataRegistro = dataAgora });

                context.CursosDisciplinas.Add(new CursoDisciplina() { CursoDisciplinaId = 4, CursoId = 2, DisciplinaId = 1, IsAtivo = 1, DataRegistro = dataAgora });
                context.CursosDisciplinas.Add(new CursoDisciplina() { CursoDisciplinaId = 5, CursoId = 2, DisciplinaId = 2, IsAtivo = 1, DataRegistro = dataAgora });
                context.CursosDisciplinas.Add(new CursoDisciplina() { CursoDisciplinaId = 6, CursoId = 2, DisciplinaId = 3, IsAtivo = 1, DataRegistro = dataAgora });
                context.CursosDisciplinas.Add(new CursoDisciplina() { CursoDisciplinaId = 7, CursoId = 2, DisciplinaId = 4, IsAtivo = 1, DataRegistro = dataAgora });
                context.CursosDisciplinas.Add(new CursoDisciplina() { CursoDisciplinaId = 8, CursoId = 2, DisciplinaId = 5, IsAtivo = 1, DataRegistro = dataAgora });
                context.CursosDisciplinas.Add(new CursoDisciplina() { CursoDisciplinaId = 9, CursoId = 2, DisciplinaId = 6, IsAtivo = 1, DataRegistro = dataAgora });
                context.CursosDisciplinas.Add(new CursoDisciplina() { CursoDisciplinaId = 10, CursoId = 2, DisciplinaId = 7, IsAtivo = 1, DataRegistro = dataAgora });

                context.CursosDisciplinas.Add(new CursoDisciplina() { CursoDisciplinaId = 11, CursoId = 3, DisciplinaId = 4, IsAtivo = 1, DataRegistro = dataAgora });
                context.CursosDisciplinas.Add(new CursoDisciplina() { CursoDisciplinaId = 12, CursoId = 3, DisciplinaId = 5, IsAtivo = 1, DataRegistro = dataAgora });

                context.CursosDisciplinas.Add(new CursoDisciplina() { CursoDisciplinaId = 13, CursoId = 4, DisciplinaId = 5, IsAtivo = 1, DataRegistro = dataAgora });
                context.CursosDisciplinas.Add(new CursoDisciplina() { CursoDisciplinaId = 14, CursoId = 4, DisciplinaId = 6, IsAtivo = 1, DataRegistro = dataAgora });

                context.CursosDisciplinas.Add(new CursoDisciplina() { CursoDisciplinaId = 15, CursoId = 5, DisciplinaId = 6, IsAtivo = 1, DataRegistro = dataAgora });
                context.CursosDisciplinas.Add(new CursoDisciplina() { CursoDisciplinaId = 16, CursoId = 5, DisciplinaId = 7, IsAtivo = 1, DataRegistro = dataAgora });
            }

            if (!context.Aulas.Any())
            {
                context.Aulas.Add(new Aula() { AulaId = 1, DisciplinaId = 1, Nome = "HTML e CSS", Thumbnail = "1.webp", Video = "1.mp4", ResumoAula = "#1 - Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 2, DisciplinaId = 1, Nome = "SLLW?", Thumbnail = "2.webp", Video = "2.mp4", ResumoAula = "#2 - Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 3, DisciplinaId = 1, Nome = "Khaaa...", Thumbnail = "3.webp", Video = "/padrao/video/3.mp4", ResumoAula = "#3 - Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.", DataRegistro = dataAgora, IsAtivo = 1 });

                context.Aulas.Add(new Aula() { AulaId = 4, DisciplinaId = 2, Nome = "Trabalhando e relaxando", Thumbnail = "4.webp", Video = "4.mp4", ResumoAula = "#4 - Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 5, DisciplinaId = 2, Nome = "JS", Thumbnail = "5.webp", Video = "5.mp4", ResumoAula = "#5 - Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.", DataRegistro = dataAgora, IsAtivo = 1 });

                context.Aulas.Add(new Aula() { AulaId = 6, DisciplinaId = 3, Nome = "Tornando-se um mictor", Thumbnail = "6.webp", Video = "6.mp4", ResumoAula = "#6 - Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 7, DisciplinaId = 3, Nome = "Como ser um perdigato?", Thumbnail = "7.webp", Video = "7.mp4", ResumoAula = "#7 - Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 8, DisciplinaId = 3, Nome = "Kapa & kapas", Thumbnail = "8.webp", Video = "8.mp4", ResumoAula = "#8 - Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.", DataRegistro = dataAgora, IsAtivo = 1 });
            }

            if (!context.AulaTimings.Any())
            {
                context.AulaTimings.Add(new AulaTiming() { AulaTimingId = 1, AulaId = 1, Titulo = "xxx", TempoEmSegundos = "8.4" });
                context.AulaTimings.Add(new AulaTiming() { AulaTimingId = 2, AulaId = 1, Titulo = "yyy", TempoEmSegundos = "145.3" });
                context.AulaTimings.Add(new AulaTiming() { AulaTimingId = 3, AulaId = 1, Titulo = "zzz", TempoEmSegundos = "240.6" });
                context.AulaTimings.Add(new AulaTiming() { AulaTimingId = 4, AulaId = 1, Titulo = "aaa", TempoEmSegundos = "300.6" });

                context.AulaTimings.Add(new AulaTiming() { AulaTimingId = 5, AulaId = 2, Titulo = "bbb", TempoEmSegundos = "8.4" });
                context.AulaTimings.Add(new AulaTiming() { AulaTimingId = 6, AulaId = 2, Titulo = "ccc", TempoEmSegundos = "145.3" });
            }

            if (!context.UsuariosCursos.Any())
            {
                context.UsuariosCursos.Add(new UsuarioCurso() { UsuarioCursoId = 1, UsuarioId = 1, CursoId = 4, IsAtivo = 1, DataRegistro = dataAgora });
                context.UsuariosCursos.Add(new UsuarioCurso() { UsuarioCursoId = 2, UsuarioId = 2, CursoId = 2, IsAtivo = 1, DataRegistro = dataAgora });
                context.UsuariosCursos.Add(new UsuarioCurso() { UsuarioCursoId = 3, UsuarioId = 2, CursoId = 3, IsAtivo = 1, DataRegistro = dataAgora });
            }
            #endregion

            context.SaveChanges();
        }
    }
}
