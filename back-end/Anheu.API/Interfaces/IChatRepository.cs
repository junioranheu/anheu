using Anheu.API.Models;

namespace Anheu.API.Interfaces
{
    public interface IChatRepository
    {
        Task UsuarioConectado(string usuarioNome, string usuarioId);
        Task ReceberMensagem(Chat c);
    }
}
