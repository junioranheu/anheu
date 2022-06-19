using Anheu.API.Hubs;
using Anheu.API.Interfaces;
using Anheu.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Anheu.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatsController : BaseController<ChatsController>
    {
        private readonly IHubContext<ChatHub, IChatRepository> _chatHub;

        public ChatsController(IHubContext<ChatHub, IChatRepository> chatHub)
        {
            _chatHub = chatHub;
        }

        [HttpPost("enviarMensagemTodos")]
        public async Task Post(Chat c)
        {
            // run some logic...

            await _chatHub.Clients.All.ReceiveMessage(c);
        }
    }
}
