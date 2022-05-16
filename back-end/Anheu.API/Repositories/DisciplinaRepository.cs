using Microsoft.EntityFrameworkCore;
using Anheu.API.Data;
using Anheu.API.Interfaces;
using Anheu.API.Models;

namespace Anheu.API.Repositories
{
    public class DisciplinaRepository : IDisciplinaRepository
    {
        public readonly Context _context;

        public DisciplinaRepository(Context context)
        {
            _context = context;
        }

        public async Task<List<Disciplina>> GetTodos()
        {
            var itens = await _context.Disciplinas.
                Include(dt => dt.DisciplinaTags).
                Include(a => a.Aulas).
                OrderBy(n => n.Nome).AsNoTracking().ToListAsync();

            return itens;
        }

        public async Task<Disciplina> GetPorId(int id)
        {
            var item = await _context.Disciplinas.
                Include(dt => dt.DisciplinaTags).
                Include(a => a.Aulas).
                Where(p => p.DisciplinaId == id).AsNoTracking().FirstOrDefaultAsync();

            return item;
        }

        public async Task<int> PostCriar(Disciplina m)
        {
            _context.Add(m);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        public async Task<int> PostAtualizar(Disciplina m)
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
            var dados = await _context.Disciplinas.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.Disciplinas.Remove(dados);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        private async Task<bool> IsExiste(int id)
        {
            return await _context.Disciplinas.AnyAsync(m => m.DisciplinaId == id);
        }
    }
}
