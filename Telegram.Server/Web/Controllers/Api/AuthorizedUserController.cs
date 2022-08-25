using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Telegram.Server.Core;
using Telegram.Server.Core.Attributes.Model;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Mapping;
using Telegram.Server.Core.Services.Controllers;

namespace Telegram.Server.Web.Controllers.Api
{
    [Authorize]
    public class AuthorizedUserController : Controller
    {
        private readonly AuthorizedUserService _authorizedUserService;
        
        private readonly MessageService _messages;

        public AuthorizedUserController(AuthorizedUserService authorizedUserService, MessageService messages)
        {
            _authorizedUserService = authorizedUserService;
            _messages = messages;
        }

        [HttpGet]
        [Route("api/1.0/authorized-user")]
        public async Task<IActionResult> AuthorizedUser()
        {
            return Json(await _authorizedUserService.Get());
        }

        [HttpGet]
        [Route("api/1.0/authorized-user/chat-ids")]
        public async Task<IActionResult> ChatIds()
        {
            var result = await _authorizedUserService.ChatIds();

            return Json(result);
        }

        [HttpPost]
        [Route("api/1.0/authorized-user/chats")]
        public async Task<IActionResult> Chats([FromForm]PaginationModel pagination)
        {
            var result = await _authorizedUserService.Chats(new Pagination(pagination));

            return Json(result);
        }

        [HttpGet]
        [Route("api/1.0/authorized-user/chats/{id:int}")]
        public async Task<IActionResult> Chat([FromRoute]int id)
        {
            var result = await _authorizedUserService.Chat(id);

            return Json(result);
        }

        [HttpGet]
        [Route("api/1.0/authorized-user/contacts")]
        public async Task<IActionResult> Contacts()
        {
            return Json(await _authorizedUserService.Contacts());
        }

        [HttpGet]
        [Route("api/1.0/authorized-user/avatar")]
        public IActionResult ChangeAvatar([FromQuery]string uri)
        {
            _authorizedUserService.ChangeAvatar(uri);

            return Ok();
        }
        
        [HttpPost]
        [Route("api/1.0/authorized-user/groups/add")]
        [Authorize]
        public async Task<IActionResult> AddGroupChat([FromForm]ChatMap map)
        {
            var chat = await _authorizedUserService.AddGroup(map);
            await _messages.AddNewUsersMessage(
                chat.Id,
                chat.Members.Select(m => m.UserId)
            );
            
            return Json(chat);
        }

        [HttpPut]
        [Route("api/1.0/authorized-user")]
        [ModelValidation]
        public IActionResult Update([FromForm]User user)
        {
            _authorizedUserService.Update(user);
            
            return Ok();
        }
    }
}