using Anheu.API.Models;

namespace Anheu.API.Interfaces
{
    public interface IUsuarioCursoRepository
    {
        Task<List<UsuarioCurso>> GetTodos();
        Task<UsuarioCurso> GetPorId(int id);
        Task<int> PostCriar(UsuarioCurso u);
        Task<int> PostAtualizar(UsuarioCurso u);
        Task<int> PostDeletar(int id);
        Task<List<UsuarioCurso>> GetPorUsuarioId(int usuarioId);
    }
}
