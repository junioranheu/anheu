using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Anheu.API.Interfaces;
using Anheu.API.Models;
using Anheu.API.Controllers;

namespace Spotify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DisciplinasController : BaseController<DisciplinasController>
    {
        private readonly IDisciplinaRepository _disciplinaRepository;

        public DisciplinasController(IDisciplinaRepository playlistRepository)
        {
            _disciplinaRepository = playlistRepository;
        }

        [HttpGet("todos")]
        public async Task<ActionResult<List<Disciplina>>> GetTodos()
        {
            var todos = await _disciplinaRepository.GetTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Disciplina>> GetPorId(int id)
        {
            var porId = await _disciplinaRepository.GetPorId(id);

            if (porId == null)
            {
                return NotFound();
            }

            return Ok(porId);
        }

        [HttpPost("criar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostCriar(Disciplina playlist)
        {
            var isOk = await _disciplinaRepository.PostCriar(playlist);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }

        [HttpPost("atualizar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostAtualizar(Disciplina playlist)
        {
            var isOk = await _disciplinaRepository.PostAtualizar(playlist);

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
            var isOk = await _disciplinaRepository.PostDeletar(id);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }
    }
}
