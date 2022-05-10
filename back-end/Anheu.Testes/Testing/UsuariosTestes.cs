using Newtonsoft.Json;
using Anheu.API.Models;
using Anheu.Testes.Services;
using System.Collections.Generic;
using System.Net;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Xunit;

namespace Anheu.Testes.Testing
{
    public class UsuariosTestes
    {
        private readonly TestClientProvider _testProvider;
        private const string caminhoApi = "/api/Usuarios";

        public UsuariosTestes()
        {
            _testProvider = new TestClientProvider();
        }

        [Fact]
        public async Task Test_GetTodos()
        {
            using var client = _testProvider.Client;

            // Autenticar;
            var token = await _testProvider.AutenticarTesteUnitario();

            // Teste;
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await client.GetAsync($"{caminhoApi}/todos");
            response.EnsureSuccessStatusCode();

            var contentStr = await response.Content.ReadAsStringAsync(); // Conteúdo da resposta em string (JSON "bagunçado");
            var content = JsonConvert.DeserializeObject<List<Usuario>>(contentStr); // Converter string para a classe em si;

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.True(content?.Count > 0);
        }

        [Theory]
        [InlineData(1, HttpStatusCode.OK)]
        [InlineData(2, HttpStatusCode.OK)]
        [InlineData(100, HttpStatusCode.NotFound)]
        public async Task Test_GetPorId(int usuarioId, HttpStatusCode resultadoEsperado)
        {
            using var client = _testProvider.Client;
            var response = await client.GetAsync($"{caminhoApi}/{usuarioId}");
            // response.EnsureSuccessStatusCode();

            var contentStr = await response.Content.ReadAsStringAsync();
            var content = JsonConvert.DeserializeObject<Usuario>(contentStr);

            Assert.Equal(resultadoEsperado, response.StatusCode);
        }
    }
}
