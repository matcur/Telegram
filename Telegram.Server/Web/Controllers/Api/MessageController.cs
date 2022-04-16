using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Telegram.Server.Core;
using Telegram.Server.Core.Attributes.Model;
using Telegram.Server.Core.Auth;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Domain;
using Telegram.Server.Core.Domain.Bots;
using Telegram.Server.Core.Mapping;
using Telegram.Server.Core.Services.Hubs;
using Telegram.Server.Web.Hubs;

namespace Telegram.Server.Web.Controllers.Api
{
    [Authorize]
    public class MessageController : Controller
    {
        private readonly AppDb _db;
        
        private readonly ChatHubService _chatHub;
        
        private readonly AuthorizedUser _authorizedUser;

        private readonly DbSet<Chat> _chats;

        private readonly IDomainBot _bot;

        private readonly DbSet<Message> _messages;
        
        private readonly DbSet<Content> _contents;
        
        private readonly DbSet<User> _users;

        public MessageController(AppDb db, ChatHubService chatHub, AuthorizedUser authorizedUser)
        {
            _db = db;
            _chatHub = chatHub;
            _authorizedUser = authorizedUser;
            _chats = db.Chats;
            _messages = db.Messages;
            _contents = db.Contents;
            _users = db.Users;
            _bot = new ChatBots(db);
        }
        
        [HttpPost]
        [ModelValidation]
        [Route("api/1.0/messages/create")]
        public async Task<IActionResult> Add([FromForm]MessageMap map)
        {
            if (!_chats.Any(c => c.Id == map.ChatId))
            {
                return Json(new RequestResult(
                    false, $"Chat with id = {map.ChatId} doesn't exist"
                ));
            }

            var message = new Message(map);
            message.Author = await _users.FindAsync(_authorizedUser.Id());
            await _messages.AddAsync(message);
            await _db.SaveChangesAsync();
            _chatHub.EmitMessage(message);
            _bot.Act(message);

            return Json(new RequestResult(true, message));
        }

        [HttpPut]
        [ModelValidation]
        [Route("api/1.0/messages/{id:int}")]
        public IActionResult Update([FromRoute]int id, [FromForm]UpdateMessageMap map)
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
            message.ContentMessages.AddRange(map.ContentMessages);

            _db.SaveChanges();

            return Json(new RequestResult(true, message));
        }
    }
}