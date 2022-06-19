using Anheu.API.Interfaces;
using Anheu.API.Models;
using Microsoft.AspNetCore.SignalR;

namespace Anheu.API.Hubs
{
    // https://medium.com/swlh/creating-a-simple-real-time-chat-with-net-core-reactjs-and-signalr-6367dcadd2c6
    public class ChatHub : Hub<IChatRepository>
    {
        public async Task SendMessage(Chat c)
        {
            await Clients.All.ReceiveMessage(c);
        }
    }
}
