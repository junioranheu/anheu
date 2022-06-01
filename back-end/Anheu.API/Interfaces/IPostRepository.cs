using Anheu.API.Models;

namespace Anheu.API.Interfaces
{
    public interface IPostRepository
    {
        Task<List<Post>> GetTodos();
        Task<Post> GetPorId(int id);
        Task<int> PostCriar(Post p);
        Task<int> PostAtualizar(Post p);
        Task<int> PostDeletar(int id);
        Task<List<Post>> GetPorPostCategoriaId(int postCategoriaId);
    }
}
