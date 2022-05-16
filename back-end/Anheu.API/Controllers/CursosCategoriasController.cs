using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Anheu.API.Interfaces;
using Anheu.API.Models;
using Anheu.API.Controllers;

namespace Spotify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosCategoriasController : BaseController<CursosCategoriasController>
    {
        private readonly ICursoCategoriaRepository _cursoCateogriaRepository;

        public CursosCategoriasController(ICursoCategoriaRepository cursoCategoriaRepository)
        {
            _cursoCateogriaRepository = cursoCategoriaRepository;
        }

        [HttpGet("todos")]
        public async Task<ActionResult<List<CursoCategoria>>> GetTodos()
        {
            var todos = await _cursoCateogriaRepository.GetTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CursoCategoria>> GetPorId(int id)
        {
            var porId = await _cursoCateogriaRepository.GetPorId(id);

            if (porId == null)
            {
                return NotFound();
            }

            return Ok(porId);
        }

        [HttpPost("criar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostCriar(CursoCategoria cursoCategoria)
        {
            var isOk = await _cursoCateogriaRepository.PostCriar(cursoCategoria);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }

        [HttpPost("atualizar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostAtualizar(CursoCategoria cursoCategoria)
        {
            var isOk = await _cursoCateogriaRepository.PostAtualizar(cursoCategoria);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }

        [HttpPost("deletar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<int>> PostDeletar(int id)
        {
            var isOk = await _cursoCateogriaRepository.PostDeletar(id);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }
    }
}
