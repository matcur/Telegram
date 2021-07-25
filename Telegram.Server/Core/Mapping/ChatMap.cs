using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Telegram.Server.Core.Mapping
{
    public class ChatMap
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public string IconPath { get; set; }

        [Required]
        public IFormFile Icon { get; set; }
    }
}