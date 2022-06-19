using System.ComponentModel.DataAnnotations;

namespace Anheu.API.Models
{
    public class Chat
    {
        [Key]
        public int ChatId { get; set; }
        public string? Usuario { get; set; }
        public string? Mensagem { get; set; }
    }
}
