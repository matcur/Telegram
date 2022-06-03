using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Telegram.Server.Core;
using Telegram.Server.Core.Services.Controllers;

namespace Telegram.Server.Web.Controllers.Api
{
    [Authorize]
    public class AuthorizedUserController : Controller
    {
        private readonly AuthorizedUserService _authorizedUserService;

        public AuthorizedUserController(AuthorizedUserService authorizedUserService)
        {
            _authorizedUserService = authorizedUserService;
        }

        [HttpGet]
        [Route("api/1.0/authorized-user")]
        public async Task<IActionResult> AuthorizedUser()
        {
            return Json(new RequestResult(true, await _authorizedUserService.Get()));
        }

        [HttpGet]
        [Route("api/1.0/authorized-user/chats")]
        public IActionResult Chats([FromQuery]int count, [FromQuery]int offset = 0)
        {
            var result = _authorizedUserService.Chats(new Pagination(count, offset));

            return Json(new RequestResult(true, result));
        }

        [HttpPost]
        [Route("api/1.0/authorized-user/avatar")]
        public IActionResult ChangeAvatar([FromQuery]string uri)
        {
            _authorizedUserService.ChangeAvatar(uri);

            return Ok();
        }
    }
}