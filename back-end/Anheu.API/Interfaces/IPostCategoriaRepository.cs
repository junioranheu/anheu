using Anheu.API.Models;

namespace Anheu.API.Interfaces
{
    public interface IPostCategoriaRepository
    {
        Task<List<PostCategoria>> GetTodos();
        Task<PostCategoria> GetPorId(int id);
        Task<int> PostCriar(PostCategoria pc);
        Task<int> PostAtualizar(PostCategoria pc);
        Task<int> PostDeletar(int id);
    }
}
