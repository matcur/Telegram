using System.Collections.Generic;
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

        private readonly DbSet<Message> _messages;
        
        private readonly DbSet<Content> _contents;

        public MessageController(AppDb db)
        {
            _db = db;
            _chats = db.Chats;
            _messages = db.Messages;
            _contents = db.Contents;
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

        [HttpPut]
        [ModelValidation]
        [Route("api/1.0/messages/{id:int}")]
        public IActionResult Update([FromRoute]int id, [FromForm]List<ContentMap> content)
        {
            var message = _messages
                .Include(m => m.ContentMessages)
                .ThenInclude(c => c.Content)
                .Include(m => m.Author)
                .FirstOrDefault(m => m.Id == id);
            if (message == null)
            {
                return Json(new RequestResult(
                    false, $"Message with id = {id} doesn't exist"
                ));
            }

            _contents.RemoveRange(message.ContentMessages.Select(c => c.Content));
            message.ContentMessages.AddRange(content.Select(c => new ContentMessage
            {
                Content = new Content(c),
                Message = message,
            }));

            _db.SaveChanges();

            return Json(new RequestResult(true, message));
        }
    }
}