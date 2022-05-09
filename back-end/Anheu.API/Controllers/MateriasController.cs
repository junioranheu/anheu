using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Anheu.API.Interfaces;
using Anheu.API.Models;
using Anheu.API.Controllers;

namespace Spotify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MateriasController : BaseController<MateriasController>
    {
        private readonly IMateriaRepository _materiaRepository;

        public MateriasController(IMateriaRepository playlistRepository)
        {
            _materiaRepository = playlistRepository;
        }

        [HttpGet("todos")]
        public async Task<ActionResult<List<Materia>>> GetTodos()
        {
            var todos = await _materiaRepository.GetTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Materia>> GetPorId(int id)
        {
            var porId = await _materiaRepository.GetPorId(id);

            if (porId == null)
            {
                return NotFound();
            }

            return Ok(porId);
        }

        [HttpPost("criar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostCriar(Materia playlist)
        {
            var isOk = await _materiaRepository.PostCriar(playlist);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }

        [HttpPost("atualizar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostAtualizar(Materia playlist)
        {
            var isOk = await _materiaRepository.PostAtualizar(playlist);

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
            var isOk = await _materiaRepository.PostDeletar(id);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }
    }
}
