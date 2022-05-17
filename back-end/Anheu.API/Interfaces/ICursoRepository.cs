using Anheu.API.Models;

namespace Anheu.API.Interfaces
{
    public interface ICursoRepository
    {
        Task<List<Curso>> GetTodos();
        Task<Curso> GetPorId(int id);
        Task<int> PostCriar(Curso c);
        Task<int> PostAtualizar(Curso c);
        Task<int> PostDeletar(int id);
        Task<List<Curso>> GetPorCursoCategoriaId(int cursoCategoriaId);
    }
}
