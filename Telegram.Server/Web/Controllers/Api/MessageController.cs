using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core;
using Telegram.Server.Core.Attributes.Model;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Web.Controllers.Api
{
    public class MessageController : Controller
    {
        private readonly AppDb _db;
        
        private readonly DbSet<Chat> _chats;
        
        public MessageController(AppDb db)
        {
            _db = db;
            _chats = db.Chats;
        }
        
        [HttpPost]
        [ModelValidation]
        [Route("api/1.0/messages/create")]
        public IActionResult Add([FromForm]MessageMap map)
        {
            var chat = _chats.FirstOrDefault(c => c.Id == map.ChatId);
            if (chat == null)
            {
                return Json(new RequestResult(
                    false, $"Chat with id = {map.ChatId} doesn't exist"
                ));
            }

            var message = new Message(map);
            _db.Add(message);
            _db.SaveChanges();

            return Json(new RequestResult(true, message));
        }
    }
}