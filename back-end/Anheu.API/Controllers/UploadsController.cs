﻿using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("getArquivoProtegido/nomePasta={nomePasta}&nomeSubpasta={nomeSubpasta}&nomeArquivo={nomeArquivo}")]
        [Authorize] // Precisa estar autorizado com token para acessar isso!
        public async Task<ActionResult<Tuple<string, string>>> GetArquivoProtegido(string nomePasta, string? nomeSubpasta, string nomeArquivo)
        {
            var watch = System.Diagnostics.Stopwatch.StartNew();
            string wwwPath = _webHostEnvironment.WebRootPath ?? _webHostEnvironment.ContentRootPath;
            string caminho = $"{wwwPath}UploadProtegido/{nomePasta}/{nomeSubpasta}/{nomeArquivo}";

            if (!String.IsNullOrEmpty(caminho))
            {
                if (System.IO.File.Exists(caminho))
                {
                    Byte[] bytes = await System.IO.File.ReadAllBytesAsync(caminho);
                    string arquivoBase64 = Convert.ToBase64String(bytes);
                    string extensaoArquivo = GetMimeType(caminho);

                    if (String.IsNullOrEmpty(arquivoBase64) || String.IsNullOrEmpty(extensaoArquivo))
                    {
                        return Problem();
                    }

                    // Gerar o base64 final;
                    string arquivoBase64Final = $"data:{extensaoArquivo};base64,{arquivoBase64}";

                    // Parar o Stopwatch;
                    watch.Stop();
                    var elapsedMs = watch.ElapsedMilliseconds;

                    return new Tuple<string, string>(arquivoBase64Final, elapsedMs.ToString());
                }
                else
                {
                    return NotFound();
                }
            }

            return NotFound();
        }
    }
}
