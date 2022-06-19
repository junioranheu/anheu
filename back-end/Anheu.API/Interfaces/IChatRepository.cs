using Anheu.API.Models;

namespace Anheu.API.Interfaces
{
    public interface IChatRepository
    {
        Task ReceiveMessage(Chat c);
    }
}
