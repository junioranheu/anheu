using Microsoft.EntityFrameworkCore;
using Anheu.API.Data;
using Anheu.API.Interfaces;
using Anheu.API.Models;

namespace Anheu.API.Repositories
{
    public class CursoRepository : ICursoRepository
    {
        public readonly Context _context;

        public CursoRepository(Context context)
        {
            _context = context;
        }

        public async Task<List<Curso>> GetTodos()
        {
            var itens = await _context.Cursos.
                Include(cd => cd.CursosDisciplinas).ThenInclude(d => d.Disciplinas).ThenInclude(dt => dt.DisciplinaTags).
                Include(cc => cc.CursosCategorias).
                OrderBy(n => n.Nome).AsNoTracking().ToListAsync();

            return itens;
        }

        public async Task<Curso> GetPorId(int id)
        {
            var item = await _context.Cursos.
                Include(cd => cd.CursosDisciplinas).ThenInclude(d => d.Disciplinas).ThenInclude(dt => dt.DisciplinaTags).
                Include(cc => cc.CursosCategorias).
                Where(p => p.CursoId == id).AsNoTracking().FirstOrDefaultAsync();

            return item;
        }

        public async Task<int> PostCriar(Curso m)
        {
            _context.Add(m);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        public async Task<int> PostAtualizar(Curso m)
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
            var dados = await _context.Cursos.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.Cursos.Remove(dados);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        private async Task<bool> IsExiste(int id)
        {
            return await _context.Cursos.AnyAsync(m => m.CursoId == id);
        }

        public async Task<List<Curso>> GetPorCursoCategoriaId(int cursoCategoriaId)
        {
            var itens = await _context.Cursos.
                Include(cd => cd.CursosDisciplinas).ThenInclude(d => d.Disciplinas).ThenInclude(dt => dt.DisciplinaTags).
                Include(cc => cc.CursosCategorias).
                Where(p => p.CursoCategoriaId == cursoCategoriaId).AsNoTracking().ToListAsync();

            return itens;
        }
    }
}
