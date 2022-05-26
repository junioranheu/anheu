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
                context.Aulas.Add(new Aula() { AulaId = 1, DisciplinaId = 1, Nome = "HTML", Thumbnail = "1.webp", Video = "1.mp4", ResumoAula = "A Linguagem de Marcação de Hipertexto (HTML) é uma linguagem de computador que compõe a maior parte das páginas da internet e dos aplicativos online", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 2, DisciplinaId = 1, Nome = "CSS", Thumbnail = "2.webp", Video = "2.mp4", ResumoAula = "A função do CSS é justamente otimizar o aspecto visual das páginas, de uma maneira mais organizada e menos complexa na hora realizar manutenção", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 3, DisciplinaId = 1, Nome = "Seu primeiro projeto web", Thumbnail = "3.webp", Video = "3.mp4", ResumoAula = "Crie sua primeira aplicação web responsiva estática apenas com HTML e CSS", DataRegistro = dataAgora, IsAtivo = 1 });

                context.Aulas.Add(new Aula() { AulaId = 4, DisciplinaId = 2, Nome = "Javascript básico", Thumbnail = "4.webp", Video = "4.mp4", ResumoAula = "JavaScript é uma linguagem de programação de alto nível criada, a princípio, para ser executada em navegadores e manipular comportamentos de páginas web", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 5, DisciplinaId = 2, Nome = "JQuery", Thumbnail = "5.webp", Video = "5.mp4", ResumoAula = "O objetivo do jQuery é o incremento das linhas de código da linguagem de programação JavaScript, mas não de forma a adicionar complexidade. A biblioteca, pelo contrário, simplifica o que teria que ser escrito com strings, linhas e mais linhas de código em JavaScript", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 6, DisciplinaId = 2, Nome = "Misturando HTML, CSS e JS", Thumbnail = "6.webp", Video = "6.mp4", ResumoAula = "Crie um projeto web utilizando HTML, CSS e, agora, Javascript!", DataRegistro = dataAgora, IsAtivo = 1 });

                context.Aulas.Add(new Aula() { AulaId = 7, DisciplinaId = 3, Nome = "O que é React.js?", Thumbnail = "7.webp", Video = "7.mp4", ResumoAula = "React.js é uma biblioteca JavaScript para a criação de interfaces de usuário — ou UI (user interface)", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 8, DisciplinaId = 3, Nome = "NPM e Yarn", Thumbnail = "8.webp", Video = "8.mp4", ResumoAula = "NPM ou Yarn, ambos são gerenciadores de dependências/pacotes para Javascript e com eles é possível melhorar o reaproveitamento de código, unificar dependências nos projetos de todos os desenvolvedores, acelerar o desenvolvimento e entre outros benefícios", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 9, DisciplinaId = 3, Nome = "Criando seu primeiro projeto", Thumbnail = "9.webp", Video = "9.mp4", ResumoAula = "Crie seu primeiro projeto em React, usando o prompt de comando, em poucos segundos", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 10, DisciplinaId = 3, Nome = "Hooks", Thumbnail = "10.webp", Video = "10.mp4", ResumoAula = "Resumidamente, Hooks é uma nova proposta que irá nos permitir utilizar estado, ciclo de vida, entre outras funcionalidades, sem a necessidade de escrevermos componentes com classe", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 11, DisciplinaId = 3, Nome = "Next.js", Thumbnail = "11.webp", Video = "11.mp4", ResumoAula = "Saiba o que é e para o que serve o Next.js, um framework, com foco em acelerar a criação de sites e aplicações web com React", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 12, DisciplinaId = 3, Nome = "React intermediário", Thumbnail = "12.webp", Video = "12.mp4", ResumoAula = "React, mas um pouco mais complicadinho...", DataRegistro = dataAgora, IsAtivo = 1 });

                context.Aulas.Add(new Aula() { AulaId = 13, DisciplinaId = 4, Nome = "Bancos de dados relacionais", Thumbnail = "13.webp", Video = "13.mp4", ResumoAula = "Um banco de dados relacional é um tipo de banco de dados que armazena e fornece acesso a pontos de dados relacionados entre si", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 14, DisciplinaId = 4, Nome = "MySQL e phpMyAdmin", Thumbnail = "14.webp", Video = "14.mp4", ResumoAula = "O MySQL é um sistema gerenciador de banco de dados relacional de código aberto usado na maioria das aplicações gratuitas para gerir suas informações", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 15, DisciplinaId = 4, Nome = "SQL Server e SSMS", Thumbnail = "15.webp", Video = "15.mp4", ResumoAula = "Igual o MySQL, mas pago", DataRegistro = dataAgora, IsAtivo = 1 });

                context.Aulas.Add(new Aula() { AulaId = 16, DisciplinaId = 5, Nome = "Lógica de programação", Thumbnail = "16.webp", Video = "16.mp4", ResumoAula = "Lógica de programação é a organização coesa de uma sequência de instruções voltadas à resolução de um problema, ou à criação de um software", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 17, DisciplinaId = 5, Nome = "Qual linguagem é a melhor?", Thumbnail = "17.webp", Video = "17.mp4", ResumoAula = "C#", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 18, DisciplinaId = 5, Nome = "Java", Thumbnail = "18.webp", Video = "18.mp4", ResumoAula = "Eca", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 19, DisciplinaId = 5, Nome = "C#", Thumbnail = "19.webp", Video = "19.mp4", ResumoAula = "A melhor", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 20, DisciplinaId = 5, Nome = "Node.js", Thumbnail = "20.webp", Video = "20.mp4", ResumoAula = "Eca", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 21, DisciplinaId = 5, Nome = "Conectando ao banco de dados", Thumbnail = "21.webp", Video = "21.mp4", ResumoAula = "String connection e muita paciência", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 22, DisciplinaId = 5, Nome = "Criando sua primeira API", Thumbnail = "22.webp", Video = "22.mp4", ResumoAula = "De primeira é mais difícil que um parto, depois é cntrl c e cntrl v", DataRegistro = dataAgora, IsAtivo = 1 });

                context.Aulas.Add(new Aula() { AulaId = 23, DisciplinaId = 6, Nome = "O que são testes unitários?", Thumbnail = "23.webp", Video = "23.mp4", ResumoAula = "Testes unitários, assim como qualquer teste automatizados não servem principalmente para verificar se uma função específica está funcionando, mas sim para garantir que sua aplicação continue funcionando após alguma alteração em sua base de código", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 24, DisciplinaId = 6, Nome = "Como usar o xUnit no C#?", Thumbnail = "24.webp", Video = "24.mp4", ResumoAula = "É fácil, acredite", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 25, DisciplinaId = 6, Nome = "Tags Fact e Inline", Thumbnail = "25.webp", Video = "25.mp4", ResumoAula = "Bom aprender...", DataRegistro = dataAgora, IsAtivo = 1 });

                context.Aulas.Add(new Aula() { AulaId = 26, DisciplinaId = 7, Nome = "Lógica básica", Thumbnail = "26.webp", Video = "26.mp4", ResumoAula = "Lógica para os Wills", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 27, DisciplinaId = 7, Nome = "Lógica intermediária", Thumbnail = "27.webp", Video = "27.mp4", ResumoAula = "Will²", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 28, DisciplinaId = 7, Nome = "Lógica avançada", Thumbnail = "28.webp", Video = "28.mp4", ResumoAula = "Will³", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 29, DisciplinaId = 7, Nome = "Lógica pra indianos", Thumbnail = "29.webp", Video = "29.mp4", ResumoAula = "Deuses indianos programadores apenas", DataRegistro = dataAgora, IsAtivo = 1 });
            }

            if (!context.AulaTimings.Any())
            {
                context.AulaTimings.Add(new AulaTiming() { AulaTimingId = 1, AulaId = 1, Titulo = "Desgraçado, rapaz", TempoEmSegundos = "1" });
                context.AulaTimings.Add(new AulaTiming() { AulaTimingId = 2, AulaId = 1, Titulo = "Ó o lanchin dele", TempoEmSegundos = "2" });
                context.AulaTimings.Add(new AulaTiming() { AulaTimingId = 3, AulaId = 1, Titulo = "Fdp", TempoEmSegundos = "4" });

                context.AulaTimings.Add(new AulaTiming() { AulaTimingId = 4, AulaId = 2, Titulo = "Que paso ahora?", TempoEmSegundos = "1.2" });
                context.AulaTimings.Add(new AulaTiming() { AulaTimingId = 5, AulaId = 2, Titulo = "Risada", TempoEmSegundos = "2" });

                context.AulaTimings.Add(new AulaTiming() { AulaTimingId = 6, AulaId = 3, Titulo = "Will sendo ajusticiado", TempoEmSegundos = "4" });
                context.AulaTimings.Add(new AulaTiming() { AulaTimingId = 7, AulaId = 3, Titulo = "Will dando TP", TempoEmSegundos = "7" });
                context.AulaTimings.Add(new AulaTiming() { AulaTimingId = 8, AulaId = 3, Titulo = "Will fazendo kk", TempoEmSegundos = "8.2" });
                context.AulaTimings.Add(new AulaTiming() { AulaTimingId = 9, AulaId = 3, Titulo = "Will morrendo igual um 0k", TempoEmSegundos = "13.1" });
                context.AulaTimings.Add(new AulaTiming() { AulaTimingId = 10, AulaId = 3, Titulo = "Will sendo zoado", TempoEmSegundos = "17.3" });
            }

            if (!context.UsuariosCursos.Any())
            {
                context.UsuariosCursos.Add(new UsuarioCurso() { UsuarioCursoId = 1, UsuarioId = 1, CursoId = 4, IsDefinidoComoAtual = 0, IsAtivo = 1, DataRegistro = dataAgora });
                context.UsuariosCursos.Add(new UsuarioCurso() { UsuarioCursoId = 2, UsuarioId = 2, CursoId = 2, IsDefinidoComoAtual = 1, IsAtivo = 1, DataRegistro = dataAgora });
                context.UsuariosCursos.Add(new UsuarioCurso() { UsuarioCursoId = 3, UsuarioId = 2, CursoId = 3, IsDefinidoComoAtual = 0, IsAtivo = 1, DataRegistro = dataAgora });
            }
            #endregion

            context.SaveChanges();
        }
    }
}
