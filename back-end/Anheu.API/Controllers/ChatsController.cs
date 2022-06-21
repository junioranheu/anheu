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

        // Para um bom funcionamento, deve-se ativar a opção de web sockets no Azure: https://azure.microsoft.com/pt-br/blog/introduction-to-websockets-on-windows-azure-web-sites/
        public ChatsController(IHubContext<ChatHub, IChatRepository> chatHub)
        {
            _chatHub = chatHub;
        }

        [HttpPost("usuarioConectado")]
        public async Task<ActionResult<bool>> UsuarioConectado(string usuarioNome, string usuarioId)
        {
            await _chatHub.Clients.All.UsuarioConectado(usuarioNome, usuarioId);
            return Ok(true);
        }

        [HttpPost("enviarMensagemTodos")]
        public async Task<ActionResult<bool>> EnviarMensagemTodos(Chat c)
        {
            await _chatHub.Clients.All.ReceberMensagem(c);
            return Ok(true);
        }
    }
}
