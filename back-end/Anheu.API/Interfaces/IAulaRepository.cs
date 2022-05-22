using Anheu.API.Models;

namespace Anheu.API.Interfaces
{
    public interface IAulaRepository
    {
        Task<List<Aula>> GetTodos();
        Task<Aula> GetPorId(int id);
        Task<int> PostCriar(Aula a);
        Task<int> PostAtualizar(Aula a);
        Task<int> PostDeletar(int id);
    }
}
