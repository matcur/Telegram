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
            return Json(await _authorizedUserService.Get());
        }

        [HttpPost]
        [Route("api/1.0/authorized-user/chats")]
        public async Task<IActionResult> Chats([FromForm]PaginationModel pagination)
        {
            var result = await _authorizedUserService.Chats(new Pagination(pagination));

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
    }
}