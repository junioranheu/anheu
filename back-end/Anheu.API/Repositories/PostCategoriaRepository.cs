using Anheu.API.Data;
using Anheu.API.Interfaces;
using Anheu.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Anheu.API.Repositories
{
    public class PostCategoriaRepository : IPostCategoriaRepository
    {
        public readonly Context _context;

        public PostCategoriaRepository(Context context)
        {
            _context = context;
        }

        public async Task<List<PostCategoria>> GetTodos()
        {
            var itens = await _context.PostsCategorias.OrderBy(n => n.Categoria).AsNoTracking().ToListAsync();

            // Pegar a quantidade de PostsCategorias que essa categoria tem;
            foreach (var item in itens)
            {
                int qtdPostsCategorias = await _context.Posts.Where(c => c.PostCategoriaId == item.PostCategoriaId).CountAsync();
                item.QtdPosts = qtdPostsCategorias;
            }

            return itens;
        }

        public async Task<PostCategoria> GetPorId(int id)
        {
            var item = await _context.PostsCategorias.Where(p => p.PostCategoriaId == id).AsNoTracking().FirstOrDefaultAsync();

            // Pegar a quantidade de PostsCategorias que essa categoria tem;
            if (item != null)
            {
                int qtdPostsCategorias = await _context.Posts.Where(c => c.PostCategoriaId == item.PostCategoriaId).CountAsync();
                item.QtdPosts = qtdPostsCategorias;
            }

            return item;
        }

        public async Task<int> PostCriar(PostCategoria pc)
        {
            _context.Add(pc);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        public async Task<int> PostAtualizar(PostCategoria pc)
        {
            int isOk;

            try
            {
                _context.Update(pc);
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
            var dados = await _context.PostsCategorias.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.PostsCategorias.Remove(dados);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        private async Task<bool> IsExiste(int id)
        {
            return await _context.PostsCategorias.AnyAsync(m => m.PostCategoriaId == id);
        }
    }
}
