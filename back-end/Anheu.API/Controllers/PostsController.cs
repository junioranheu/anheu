using Anheu.API.Interfaces;
using Anheu.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Anheu.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : BaseController<PostsController>
    {
        private readonly IPostRepository _postRepository;

        public PostsController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet("todos")]
        public async Task<ActionResult<List<Post>>> GetTodos()
        {
            var todos = await _postRepository.GetTodos();

            // Esconder alguns atributos;
            foreach (var item in todos)
            {
                item.Usuarios.Senha = "";
            }

            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPorId(int id)
        {
            var porId = await _postRepository.GetPorId(id);

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
        public async Task<ActionResult<bool>> PostCriar(Post post)
        {
            var isOk = await _postRepository.PostCriar(post);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }

        [HttpPost("atualizar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostAtualizar(Post post)
        {
            var isOk = await _postRepository.PostAtualizar(post);

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
            var isOk = await _postRepository.PostDeletar(id);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }

        [HttpGet("porPostCategoriaId/{postCategoriaId}")]
        public async Task<ActionResult<List<Post>>> GetPorPostCategoriaId(int postCategoriaId)
        {
            var porPostCategoriaId = await _postRepository.GetPorPostCategoriaId(postCategoriaId);

            if (porPostCategoriaId == null)
            {
                return NotFound();
            }

            // Esconder alguns atributos;
            foreach (var item in porPostCategoriaId)
            {
                item.Usuarios.Senha = "";
            }

            return Ok(porPostCategoriaId);
        }

        [HttpGet("getUltimoPost")]
        public async Task<ActionResult<Post>> GetUltimoPost()
        {
            var ultimoPost = await _postRepository.GetUltimoPost();

            if (ultimoPost == null)
            {
                return NotFound();
            }

            // Esconder alguns atributos;
            ultimoPost.Usuarios.Senha = "";

            return Ok(ultimoPost);
        }
    }
}
