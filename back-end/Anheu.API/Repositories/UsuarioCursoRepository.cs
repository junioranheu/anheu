using Microsoft.EntityFrameworkCore;
using Anheu.API.Data;
using Anheu.API.Interfaces;
using Anheu.API.Models;

namespace Anheu.API.Repositories
{
    public class UsuarioCursoRepository : IUsuarioCursoRepository
    {
        public readonly Context _context;

        public UsuarioCursoRepository(Context context)
        {
            _context = context;
        }

        public async Task<List<UsuarioCurso>> GetTodos()
        {
            var itens = await _context.UsuariosCursos.
            Include(u => u.Usuarios).
            Include(c => c.Cursos).ThenInclude(u => u.Usuarios).
            OrderBy(n => n.CursoId).AsNoTracking().ToListAsync();

            return itens;
        }

        public async Task<UsuarioCurso> GetPorId(int id)
        {
            var item = await _context.UsuariosCursos.
            Include(u => u.Usuarios).
            Include(c => c.Cursos).ThenInclude(u => u.Usuarios).
            Where(p => p.UsuarioCursoId == id).AsNoTracking().FirstOrDefaultAsync();

            return item;
        }

        public async Task<int> PostCriar(UsuarioCurso m)
        {
            _context.Add(m);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        public async Task<int> PostAtualizar(UsuarioCurso m)
        {
            int isOk;

            try
            {
                _context.Update(m);
                isOk = await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return isOk;
        }

        public async Task<int> PostDeletar(int id)
        {
            var dados = await _context.UsuariosCursos.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.UsuariosCursos.Remove(dados);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        private async Task<bool> IsExiste(int id)
        {
            return await _context.UsuariosCursos.AnyAsync(m => m.UsuarioCursoId == id);
        }

        public async Task<List<UsuarioCurso>> GetPorUsuarioId(int usuarioId)
        {
            var itens = await _context.UsuariosCursos.
            Include(u => u.Usuarios).
            Include(c => c.Cursos).ThenInclude(u => u.Usuarios).
            Where(u => u.UsuarioId == usuarioId).AsNoTracking().ToListAsync();

            return itens;
        }

        public async Task<bool> VerificarUsuarioJaTemCurso(int usuarioId, int cursoId)
        {
            var isJaTem = await _context.UsuariosCursos.AnyAsync(u => u.UsuarioId == usuarioId && u.CursoId == cursoId);

            return isJaTem;
        }

        public async Task<Curso> GetCursoDefinidoAtualPorUsuarioId(int usuarioId)
        {
            var itemUsuariosCursos = await _context.UsuariosCursos.
            Include(u => u.Usuarios).
            Include(c => c.Cursos).ThenInclude(cd => cd.CursosDisciplinas).ThenInclude(d => d.Disciplinas).ThenInclude(t => t.DisciplinaTags).
            Where(u => u.UsuarioId == usuarioId && u.IsDefinidoComoAtual == 1).AsNoTracking().FirstOrDefaultAsync();

            var itemCurso = itemUsuariosCursos?.Cursos;

            return itemCurso;
        }

        public async Task<bool> PostDefinirCursoComoAtual(int usuarioId, int cursoId)
        {
            // #01 - Buscar todos os cursos do usuário;
            var itens = await _context.UsuariosCursos.Where(u => u.UsuarioId == usuarioId).
            //Include(u => u.Usuarios).
            //Include(c => c.Cursos).
            AsNoTracking().ToListAsync();

            if (itens == null)
            {
                return false;
            }

            // #02 - Iterar todos os cursos do usuário. Se for o cursoId, defina como 1, senão 2;
            foreach (var item in itens)
            {
                item.IsDefinidoComoAtual = item.CursoId == cursoId ? 1 : 0;
                _context.Update(item);
            }
     
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
