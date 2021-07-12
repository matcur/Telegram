using System.ComponentModel.DataAnnotations;

namespace Telegram.Server.Core.Mapping
{
    public class ChatMap
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }
    }
}