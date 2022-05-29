using Microsoft.AspNetCore.Mvc;
using static Anheu.Biblioteca.Biblioteca;

namespace Anheu.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadsController : BaseController<UploadsController>
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public UploadsController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("getArquivo")]
        public FileStreamResult GetArquivo(string nomePasta, string? nomeSubpasta, string nomeArquivo, bool isVerificar = true)
        {
            if (isVerificar)
            {
                if (!User.Identity.IsAuthenticated)
                {
                    return null;
                }
            }

            string wwwPath = _webHostEnvironment.WebRootPath ?? _webHostEnvironment.ContentRootPath;
            string caminho = $"{wwwPath}/upload/{nomePasta}/{(nomeSubpasta?.Trim().Length > 0 ? $"/{nomeSubpasta}" : null)}/{nomeArquivo}";

            if (!String.IsNullOrEmpty(caminho))
            {
                if (System.IO.File.Exists(caminho))
                {
                    var arquivo = System.IO.File.OpenRead(caminho);
                    string mimeType = GetMimeType(caminho);
                    var arquivoConvertido = File(arquivo, mimeType);
                    return arquivoConvertido;
                }
                else
                {
                    return null;
                }
            }

            return null;
        }
    }
}
