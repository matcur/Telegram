using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core;
using Telegram.Server.Core.Attributes.Model;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Domain;
using Telegram.Server.Core.Domain.Bots;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Web.Controllers.Api
{
    [Authorize]
    public class MessageController : Controller
    {
        private readonly AppDb _db;
        
        private readonly DbSet<Chat> _chats;
        
        private readonly IDomainBot _bot;
        
        public MessageController(AppDb db)
        {
            _db = db;
            _chats = db.Chats;
            _bot = new ChatBots(db);
        }
        
        [HttpPost]
        [ModelValidation]
        [Route("api/1.0/messages/create")]
        public async Task<IActionResult> Add([FromForm]MessageMap map)
        {
            var chat = _chats.FirstOrDefault(c => c.Id == map.ChatId);
            if (chat == null)
            {
                return Json(new RequestResult(
                    false, $"Chat with id = {map.ChatId} doesn't exist"
                ));
            }

            var message = new Message(map);
            message.AuthorId = int.Parse(User.Identity.Name);
            _db.Add(message);
            await _db.SaveChangesAsync();
            
            await _bot.Act(message);

            return Json(new RequestResult(true, message));
        }
    }
}