using Anheu.API.Models;

namespace Anheu.API.Interfaces
{
    public interface ICursoCategoriaRepository
    {
        Task<List<CursoCategoria>> GetTodos();
        Task<CursoCategoria> GetPorId(int id);
        Task<int> PostCriar(CursoCategoria cc);
        Task<int> PostAtualizar(CursoCategoria cc);
        Task<int> PostDeletar(int id);
    }
}
