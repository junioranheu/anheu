using Anheu.API.Models;

namespace Anheu.API.Interfaces
{
    public interface IDisciplinaRepository
    {
        Task<List<Disciplina>> GetTodos();
        Task<Disciplina> GetPorId(int id);
        Task<int> PostCriar(Disciplina m);
        Task<int> PostAtualizar(Disciplina m);
        Task<int> PostDeletar(int id);
    }
}
