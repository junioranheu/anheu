using Anheu.API.Models;

namespace Anheu.API.Interfaces
{
    public interface IMateriaRepository
    {
        Task<List<Materia>> GetTodos();
        Task<Materia> GetPorId(int id);
        Task<int> PostCriar(Materia m);
        Task<int> PostAtualizar(Materia m);
        Task<int> PostDeletar(int id);
    }
}
