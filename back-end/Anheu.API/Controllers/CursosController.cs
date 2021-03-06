using Anheu.API.Interfaces;
using Anheu.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Anheu.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosController : BaseController<CursosController>
    {
        private readonly ICursoRepository _cursoRepository;

        public CursosController(ICursoRepository cursoRepository)
        {
            _cursoRepository = cursoRepository;
        }

        [HttpGet("todos")]
        public async Task<ActionResult<List<Curso>>> GetTodos()
        {
            var todos = await _cursoRepository.GetTodos();

            // Esconder alguns atributos;
            foreach (var item in todos)
            {
                item.Usuarios.Senha = "";
            }

            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Curso>> GetPorId(int id)
        {
            var porId = await _cursoRepository.GetPorId(id);

            if (porId == null)
            {
                return NotFound();
            }

            // Esconder alguns atributos;
            porId.Usuarios.Senha = "";

            return Ok(porId);
        }

        [HttpPost("criar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostCriar(Curso curso)
        {
            var isOk = await _cursoRepository.PostCriar(curso);

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
            var isOk = await _cursoRepository.PostAtualizar(curso);

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
            var isOk = await _cursoRepository.PostDeletar(id);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }

        [HttpGet("porCursoCategoriaId/{cursoCategoriaId}")]
        public async Task<ActionResult<List<Curso>>> GetPorCursoCategoriaId(int cursoCategoriaId)
        {
            var porCursoCategoriaId = await _cursoRepository.GetPorCursoCategoriaId(cursoCategoriaId);

            if (porCursoCategoriaId == null)
            {
                return NotFound();
            }

            // Esconder alguns atributos;
            foreach (var item in porCursoCategoriaId)
            {
                item.Usuarios.Senha = "";
            }

            return Ok(porCursoCategoriaId);
        }
    }
}
