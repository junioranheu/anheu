using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Anheu.API.Interfaces;
using Anheu.API.Models;
using Anheu.API.Controllers;

namespace Spotify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosController : BaseController<CursosController>
    {
        private readonly ICursoRepository _CursoRepository;

        public CursosController(ICursoRepository cursoRepository)
        {
            _CursoRepository = cursoRepository;
        }

        [HttpGet("todos")]
        public async Task<ActionResult<List<Curso>>> GetTodos()
        {
            var todos = await _CursoRepository.GetTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Curso>> GetPorId(int id)
        {
            var porId = await _CursoRepository.GetPorId(id);

            if (porId == null)
            {
                return NotFound();
            }

            return Ok(porId);
        }

        [HttpPost("criar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostCriar(Curso curso)
        {
            var isOk = await _CursoRepository.PostCriar(curso);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }

        [HttpPost("atualizar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostAtualizar(Curso curso)
        {
            var isOk = await _CursoRepository.PostAtualizar(curso);

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
            var isOk = await _CursoRepository.PostDeletar(id);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }
    }
}
