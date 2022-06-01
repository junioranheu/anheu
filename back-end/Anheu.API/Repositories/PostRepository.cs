using Microsoft.EntityFrameworkCore;
using Anheu.API.Data;
using Anheu.API.Interfaces;
using Anheu.API.Models;

namespace Anheu.API.Repositories
{
    public class PostRepository : IPostRepository
    {
        public readonly Context _context;

        public PostRepository(Context context)
        {
            _context = context;
        }

        public async Task<List<Post>> GetTodos()
        {
            var itens = await _context.Posts.
                Include(pc => pc.PostsCategorias).
                Include(u => u.Usuarios).
                OrderBy(n => n.Titulo).AsNoTracking().ToListAsync();

            return itens;
        }

        public async Task<Post> GetPorId(int id)
        {
            var item = await _context.Posts.
                Include(pc => pc.PostsCategorias).
                Include(u => u.Usuarios).
                Where(p => p.PostId == id).AsNoTracking().FirstOrDefaultAsync();

            return item;
        }

        public async Task<int> PostCriar(Post m)
        {
            _context.Add(m);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        public async Task<int> PostAtualizar(Post m)
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
            var dados = await _context.Posts.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.Posts.Remove(dados);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        private async Task<bool> IsExiste(int id)
        {
            return await _context.Posts.AnyAsync(m => m.PostId == id);
        }

        public async Task<List<Post>> GetPorPostCategoriaId(int postCategoriaId)
        {
            var itens = await _context.Posts.
                Include(pc => pc.PostsCategorias).
                Include(u => u.Usuarios).
                Where(p => p.PostCategoriaId == postCategoriaId).AsNoTracking().ToListAsync();

            return itens;
        }
    }
}
