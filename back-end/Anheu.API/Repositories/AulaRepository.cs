using Microsoft.EntityFrameworkCore;
using Anheu.API.Data;
using Anheu.API.Interfaces;
using Anheu.API.Models;

namespace Anheu.API.Repositories
{
    public class AulaRepository : IAulaRepository
    {
        public readonly Context _context;

        public AulaRepository(Context context)
        {
            _context = context;
        }

        public async Task<List<Aula>> GetTodos()
        {
            var itens = await _context.Aulas.Include(t => t.AulasTimings).OrderBy(a => a.Nome).AsNoTracking().ToListAsync();
            return itens;
        }

        public async Task<Aula> GetPorId(int id)
        {
            var item = await _context.Aulas.Include(t => t.AulasTimings).Where(p => p.AulaId == id).AsNoTracking().FirstOrDefaultAsync();
            return item;
        }

        public async Task<int> PostCriar(Aula m)
        {
            _context.Add(m);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        public async Task<int> PostAtualizar(Aula m)
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
            var dados = await _context.Aulas.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.Aulas.Remove(dados);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        private async Task<bool> IsExiste(int id)
        {
            return await _context.Aulas.AnyAsync(a => a.AulaId == id);
        }
    }
}
