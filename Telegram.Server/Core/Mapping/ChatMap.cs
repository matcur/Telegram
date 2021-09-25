using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Mapping
{
    public class ChatMap
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public string IconUrl { get; set; }

        [Required]
        public IFormFile Icon { get; set; }

        public List<User> Members { get;set; }
    }
}