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
            Include(c => c.Cursos).
            OrderBy(n => n.CursoId).AsNoTracking().ToListAsync();

            return itens;
        }

        public async Task<UsuarioCurso> GetPorId(int id)
        {
            var item = await _context.UsuariosCursos.
            Include(u => u.Usuarios).
            Include(c => c.Cursos).
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
            Include(c => c.Cursos).
            Where(p => p.UsuarioId == usuarioId).AsNoTracking().ToListAsync();

            return itens;
        }

        public async Task<bool> VerificarUsuarioJaTemCurso(int usuarioId, int cursoId)
        {
            var isJaTem = await _context.UsuariosCursos.AnyAsync(u => u.UsuarioId == usuarioId && u.CursoId == cursoId);

            return isJaTem;
        }
    }
}
