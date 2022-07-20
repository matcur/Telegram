using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Telegram.Server.Core;
using Telegram.Server.Core.Services.Controllers;

namespace Telegram.Server.Web.Controllers.Api
{
    public class ChatController : Controller
    {
        private readonly ChatService _chats;
        
        private readonly MessageService _messages;
        
        private readonly UserService _users;

        public ChatController(ChatService chats, MessageService messages, UserService users)
        {
            _chats = chats;
            _messages = messages;
            _users = users;
        }
        
        [HttpGet]
        [Route("api/1.0/chats/{id:int}")]
        public async Task<IActionResult> Find([FromRoute]int id)
        {
            return Json(await _chats.Get(id));
        }

        [HttpPost]
        [Route("api/1.0/chats/{id:int}/messages")]
        public async Task<IActionResult> Messages([FromRoute]int id, [FromForm]PaginationModel pagination)
        {
            var result = await _messages.Filtered(id, new Pagination(pagination));

            return Json(result);
        }

        [HttpPost]
        [Route("api/1.0/chat/add-new-members")]
        public async Task<IActionResult> AddMembers([FromForm]int chatId, [FromForm]List<int> memberIds)
        {
            await _chats.AddMembers(chatId, memberIds);
            await _messages.AddNewUsersMessage(chatId, memberIds);

            return Ok();
        }
        
        [HttpPost]
        [Route("api/1.0/members/chats/{chatId:int}")]
        public async Task<IActionResult> Members(
            [FromQuery]int chatId, [FromForm]PaginationModel pagination)
        {
            var members = await _users.ChatMembers(chatId, new Pagination(pagination));

            return Json(members);
        }
    }
}
