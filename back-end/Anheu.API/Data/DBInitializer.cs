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

            #region seed_disciplinas_e_aulas
            if (!context.Disciplinas.Any())
            {
                context.Disciplinas.Add(new Disciplina() { DisciplinaId = 1, Nome = "HTML e CSS", Subtitulo = "Uma introdução aos novícios", Thumbnail = "", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Disciplinas.Add(new Disciplina() { DisciplinaId = 2, Nome = "Javascript", Subtitulo = "Para os semi-proccs", Thumbnail = "", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Disciplinas.Add(new Disciplina() { DisciplinaId = 3, Nome = "React.js", Subtitulo = "Para os tarugueiros, apenas", Thumbnail = "", DataRegistro = dataAgora, IsAtivo = 1 });
            }

            if (!context.DisciplinaTags.Any())
            {
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 1, DisciplinaId = 1, Tag = "#Início" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 2, DisciplinaId = 1, Tag = "#HTML" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 3, DisciplinaId = 1, Tag = "#Css" });

                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 4, DisciplinaId = 2, Tag = "#Início ao Javascript" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 5, DisciplinaId = 2, Tag = "#O que é o JS?" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 6, DisciplinaId = 2, Tag = "#Exemplo prático" });

                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 7, DisciplinaId = 3, Tag = "#Início ao React.js" });
                context.DisciplinaTags.Add(new DisciplinaTag() { DisciplinaTagId = 8, DisciplinaId = 3, Tag = "#React.js e Next.js" });
            }

            if (!context.Aulas.Any())
            {
                context.Aulas.Add(new Aula() { AulaId = 1, DisciplinaId = 1, Nome = "HTML e CSS", Thumbnail = "1.webp", Video = "1.mp4", Professor = "Junior Souza", ResumoAula = "#1 - Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 2, DisciplinaId = 1, Nome = "SLLW?", Thumbnail = "2.webp", Video = "2.mp4", Professor = "Junior Souza", ResumoAula = "#2 - Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 3, DisciplinaId = 1, Nome = "Khaaa...", Thumbnail = "3.webp", Video = "/padrao/video/3.mp4", Professor = "Junior Souza", ResumoAula = "#3 - Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.", DataRegistro = dataAgora, IsAtivo = 1 });

                context.Aulas.Add(new Aula() { AulaId = 4, DisciplinaId = 2, Nome = "Trabalhando e relaxando", Thumbnail = "4.webp", Video = "4.mp4", Professor = "Israel Cabrera", ResumoAula = "#4 - Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.",DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 5, DisciplinaId = 2, Nome = "JS", Thumbnail = "5.webp", Video = "5.mp4", Professor = "Israel Cabrera", ResumoAula = "#5 - Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.",  DataRegistro = dataAgora, IsAtivo = 1 });

                context.Aulas.Add(new Aula() { AulaId = 6, DisciplinaId = 3, Nome = "Tornando-se um mictor", Thumbnail = "6.webp", Video = "6.mp4", Professor = "Junior Souza", ResumoAula = "#6 - Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 7, DisciplinaId = 3, Nome = "Como ser um perdigato?", Thumbnail = "7.webp", Video = "7.mp4", Professor = "Junior Souza", ResumoAula = "#7 - Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.", DataRegistro = dataAgora, IsAtivo = 1 });
                context.Aulas.Add(new Aula() { AulaId = 8, DisciplinaId = 3, Nome = "Kapa & kapas", Thumbnail = "8.webp", Video = "8.mp4", Professor = "Junior Souza", ResumoAula = "#8 - Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.", DataRegistro = dataAgora, IsAtivo = 1 });
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
            #endregion

            context.SaveChanges();
        }
    }
}
