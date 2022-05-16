using Anheu.API.Models;

namespace Anheu.API.Interfaces
{
    public interface ICursoCategoriaRepository
    {
        Task<List<CursoCategoria>> GetTodos();
        Task<CursoCategoria> GetPorId(int id);
        Task<int> PostCriar(CursoCategoria c);
        Task<int> PostAtualizar(CursoCategoria c);
        Task<int> PostDeletar(int id);
    }
}
