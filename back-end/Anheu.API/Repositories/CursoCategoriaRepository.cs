using Microsoft.EntityFrameworkCore;
using Anheu.API.Data;
using Anheu.API.Interfaces;
using Anheu.API.Models;

namespace Anheu.API.Repositories
{
    public class CursoCategoriaRepository : ICursoCategoriaRepository
    {
        public readonly Context _context;

        public CursoCategoriaRepository(Context context)
        {
            _context = context;
        }

        public async Task<List<CursoCategoria>> GetTodos()
        {
            var itens = await _context.CursosCategorias.OrderBy(n => n.Categoria).AsNoTracking().ToListAsync();

            // Pegar a quantidade de cursos que essa categoria tem;
            foreach (var item in itens)
            {
                int qtdCursos = await _context.Cursos.Where(c => c.CursoCategoriaId == item.CursoCategoriaId).CountAsync();
                item.QtdCursos = qtdCursos;
            }

            return itens;
        }

        public async Task<CursoCategoria> GetPorId(int id)
        {
            var item = await _context.CursosCategorias.Where(p => p.CursoCategoriaId == id).AsNoTracking().FirstOrDefaultAsync();

            // Pegar a quantidade de cursos que essa categoria tem;
            if (item != null)
            {
                int qtdCursos = await _context.Cursos.Where(c => c.CursoCategoriaId == item.CursoCategoriaId).CountAsync();
                item.QtdCursos = qtdCursos;
            }

            return item;
        }

        public async Task<int> PostCriar(CursoCategoria cc)
        {
            _context.Add(cc);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        public async Task<int> PostAtualizar(CursoCategoria cc)
        {
            int isOk;

            try
            {
                _context.Update(cc);
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
    }
}
