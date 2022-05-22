using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Anheu.API.Interfaces;
using Anheu.API.Models;
using Anheu.API.Controllers;

namespace Spotify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AulasController : BaseController<AulasController>
    {
        private readonly IAulaRepository _aulaRepository;

        public AulasController(IAulaRepository aulaRepository)
        {
            _aulaRepository = aulaRepository;
        }

        [HttpGet("todos")]
        public async Task<ActionResult<List<Aula>>> GetTodos()
        {
            var todos = await _aulaRepository.GetTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Aula>> GetPorId(int id)
        {
            var porId = await _aulaRepository.GetPorId(id);

            if (porId == null)
            {
                return NotFound();
            }

            return Ok(porId);
        }

        [HttpPost("criar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostCriar(Aula aula)
        {
            var isOk = await _aulaRepository.PostCriar(aula);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }

        [HttpPost("atualizar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostAtualizar(Aula aula)
        {
            var isOk = await _aulaRepository.PostAtualizar(aula);

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
            var isOk = await _aulaRepository.PostDeletar(id);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }
    }
}
