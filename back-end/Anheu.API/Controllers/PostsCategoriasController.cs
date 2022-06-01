using Anheu.API.Interfaces;
using Anheu.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Anheu.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsCategoriasController : BaseController<PostsCategoriasController>
    {
        private readonly IPostCategoriaRepository _postCategoriaRepository;

        public PostsCategoriasController(IPostCategoriaRepository postCategoriaRepository)
        {
            _postCategoriaRepository = postCategoriaRepository;
        }

        [HttpGet("todos")]
        public async Task<ActionResult<List<PostCategoria>>> GetTodos()
        {
            var todos = await _postCategoriaRepository.GetTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PostCategoria>> GetPorId(int id)
        {
            var porId = await _postCategoriaRepository.GetPorId(id);

            if (porId == null)
            {
                return NotFound();
            }

            return Ok(porId);
        }

        [HttpPost("criar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostCriar(PostCategoria pc)
        {
            var isOk = await _postCategoriaRepository.PostCriar(pc);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }

        [HttpPost("atualizar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostAtualizar(PostCategoria pc)
        {
            var isOk = await _postCategoriaRepository.PostAtualizar(pc);

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
            var isOk = await _postCategoriaRepository.PostDeletar(id);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }
    }
}
