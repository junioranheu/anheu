using Microsoft.EntityFrameworkCore;
using Anheu.API.Data;
using Anheu.API.Interfaces;
using Anheu.API.Models;

namespace Anheu.API.Repositories
{
    public class MateriaRepository : IMateriaRepository
    {
        public readonly Context _context;

        public MateriaRepository(Context context)
        {
            _context = context;
        }

        public async Task<List<Materia>> GetTodos()
        {
            var itens = await _context.Materias.
                Include(m => m.MateriaTags).
                OrderBy(n => n.Nome).AsNoTracking().ToListAsync();

            return itens;
        }

        public async Task<Materia> GetPorId(int id)
        {
            var item = await _context.Materias.
                Include(m => m.MateriaTags).
                Where(p => p.MateriaId == id).AsNoTracking().FirstOrDefaultAsync();

            return item;
        }

        public async Task<int> PostCriar(Materia m)
        {
            _context.Add(m);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        public async Task<int> PostAtualizar(Materia m)
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
            var dados = await _context.Materias.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.Materias.Remove(dados);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        private async Task<bool> IsExiste(int id)
        {
            return await _context.Materias.AnyAsync(m => m.MateriaId == id);
        }
    }
}
