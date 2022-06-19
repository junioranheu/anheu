using Microsoft.AspNetCore.Mvc;

namespace Anheu.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : BaseController<ChatController>
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
