using System.Linq;
using System.Threading.Tasks;
using Sherden.AspNet.Filesystem.Files;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core;
using Telegram.Server.Core.Attributes.Model;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Extensions;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Mapping;
using Telegram.Server.Core.Notifications;
using Telegram.Server.Core.Services.Controllers;

namespace Telegram.Server.Web.Controllers.Api
{
    public class ChatController : Controller
    {
        private readonly ChatService _chats;
        
        private readonly MessageService _messages;
        
        private readonly UserService _users;
        
        private readonly MessageAdded _messageAdded;

        public ChatController(ChatService chats, MessageService messages, UserService users, MessageAdded messageAdded)
        {
            _chats = chats;
            _messages = messages;
            _users = users;
            _messageAdded = messageAdded;
        }
        
        [HttpGet]
        [Route("api/1.0/chats/{id:int}")]
        public async Task<IActionResult> Find([FromRoute]int id)
        {
            return Json(new RequestResult(true, await _chats.Get(id)));
        }

        [HttpGet]
        [Route("api/1.0/chats/{id:int}/messages")]
        public async Task<IActionResult> Messages([FromRoute]int id, [FromQuery]int offset, [FromQuery]int count)
        {
            var result = await _messages.Filtered(id, offset, count);

            return Json(new RequestResult(true, result));
        }
        
        [HttpPost]
        [Route("api/1.0/chats/create")]
        public async Task<IActionResult> Create([FromForm]ChatMap map)
        {
            return Json(new RequestResult(true, await _chats.Create(map)));
        }

        [HttpPost]
        [Route("api/1.0/chats/{chatId:int}/new-member/{userId:int}")]
        public async Task<IActionResult> AddMember([FromRoute]int chatId, [FromRoute]int userId)
        {
            await _chats.AddMember(chatId, userId);
            await _messages.AddNewUserMessage(chatId, await _users.Get(userId));

            return Json(new RequestResult(true));
        }
    }
}
