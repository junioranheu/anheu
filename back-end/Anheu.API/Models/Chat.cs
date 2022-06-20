using System.ComponentModel.DataAnnotations;

namespace Anheu.API.Models
{
    public class Chat
    {
        [Key]
        public int ChatId { get; set; }
        public string? UsuarioId { get; set; }
        public string? UsuarioNomeSistema { get; set; }
        public string? Mensagem { get; set; }
    }
}
