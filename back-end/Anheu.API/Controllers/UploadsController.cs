using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("getArquivoProtegido/nomePasta={nomePasta}&nomeSubpasta={nomeSubpasta}&nomeArquivo={nomeArquivo}&isVerificar={isVerificar}")]
        public async Task<string> GetArquivoProtegido(string nomePasta, string? nomeSubpasta, string nomeArquivo)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }

            string wwwPath = _webHostEnvironment.WebRootPath ?? _webHostEnvironment.ContentRootPath;
            string caminho = $"{wwwPath}upload/{nomePasta}/{(nomeSubpasta?.Trim().Length > 0 ? $"{nomeSubpasta}" : null)}/{nomeArquivo}";

            if (!String.IsNullOrEmpty(caminho))
            {
                if (System.IO.File.Exists(caminho))
                {
                    Byte[] bytes = await System.IO.File.ReadAllBytesAsync(caminho);
                    string arquivoBase64 = Convert.ToBase64String(bytes);
                    return arquivoBase64;
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
