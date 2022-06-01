using Anheu.API.Interfaces;
using Anheu.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Anheu.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosCursosController : BaseController<UsuariosCursosController>
    {
        private readonly IUsuarioCursoRepository _usuarioCursoRepository;

        public UsuariosCursosController(IUsuarioCursoRepository usuarioCursoRepository)
        {
            _usuarioCursoRepository = usuarioCursoRepository;
        }

        [HttpGet("todos")]
        public async Task<ActionResult<List<UsuarioCurso>>> GetTodos()
        {
            var todos = await _usuarioCursoRepository.GetTodos();

            // Esconder alguns atributos;
            foreach (var item in todos)
            {
                item.Usuarios.Senha = "";
                item.Cursos.Usuarios.Senha = "";
            }

            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioCurso>> GetPorId(int id)
        {
            var porId = await _usuarioCursoRepository.GetPorId(id);

            if (porId == null)
            {
                return NotFound();
            }

            // Esconder alguns atributos;
            porId.Usuarios.Senha = "";
            porId.Cursos.Usuarios.Senha = "";

            return Ok(porId);
        }

        [HttpPost("criar")]
        [Authorize]
        public async Task<ActionResult<bool>> PostCriar(UsuarioCurso u)
        {
            var isMesmoUsuario = await IsUsuarioSolicitadoMesmoDoToken(u.UsuarioId);

            if (isMesmoUsuario)
            {
                // Verificar se o usuário já tem esse curso em questão;
                bool isJaTem = await _usuarioCursoRepository.VerificarUsuarioJaTemCurso(u.UsuarioId, u.CursoId);

                if (isJaTem)
                {
                    return Ok(false);
                }

                // Criar registro;
                var isOk = await _usuarioCursoRepository.PostCriar(u);

                if (isOk < 1)
                {
                    return NotFound();
                }

                return Ok(true);
            }

            return Unauthorized();
        }

        [HttpPost("atualizar")]
        [Authorize]
        public async Task<ActionResult<bool>> PostAtualizar(UsuarioCurso u)
        {
            var isMesmoUsuario = await IsUsuarioSolicitadoMesmoDoToken(u.UsuarioId);

            if (isMesmoUsuario)
            {
                var isOk = await _usuarioCursoRepository.PostAtualizar(u);

                if (isOk < 1)
                {
                    return NotFound();
                }

                return Ok(true);
            }

            return Unauthorized();
        }

        [HttpPost("deletar")]
        [Authorize]
        public async Task<ActionResult<int>> PostDeletar(int id, int usuarioId)
        {
            var isMesmoUsuario = await IsUsuarioSolicitadoMesmoDoToken(usuarioId);

            if (isMesmoUsuario)
            {
                var isOk = await _usuarioCursoRepository.PostDeletar(id);

                if (isOk < 1)
                {
                    return NotFound();
                }

                return Ok(true);
            }

            return Unauthorized();
        }

        [HttpGet("porUsuarioId/{usuarioId}")]
        public async Task<ActionResult<List<UsuarioCurso>>> GetPorUsuarioId(int usuarioId)
        {
            var porUsuarioId = await _usuarioCursoRepository.GetPorUsuarioId(usuarioId);

            if (porUsuarioId == null)
            {
                return NotFound();
            }

            // Esconder alguns atributos;
            foreach (var item in porUsuarioId)
            {
                item.Usuarios.Senha = "";
                item.Cursos.Usuarios.Senha = "";
            }

            return Ok(porUsuarioId);
        }

        [HttpGet("getCursoDefinidoAtualPorUsuarioId/{usuarioId}")]
        public async Task<ActionResult<List<Curso>>> GetCursoDefinidoAtualPorUsuarioId(int usuarioId)
        {
            var item = await _usuarioCursoRepository.GetCursoDefinidoAtualPorUsuarioId(usuarioId);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpPost("postDefinirCursoComoAtual")]
        [Authorize]
        public async Task<ActionResult<bool>> PostDefinirCursoComoAtual(int usuarioId, int cursoId)
        {
            var isMesmoUsuario = await IsUsuarioSolicitadoMesmoDoToken(usuarioId);

            if (isMesmoUsuario)
            {
                var isOk = await _usuarioCursoRepository.PostDefinirCursoComoAtual(usuarioId, cursoId);

                if (!isOk)
                {
                    return NotFound();
                }

                return Ok(true);
            }

            return Unauthorized();
        }
    }
}
