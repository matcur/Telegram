using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Extensions;
using Telegram.Server.Core.Mapping;
using Telegram.Server.Core.Services.Controllers;

namespace Telegram.Server.Web.Controllers.Api
{
    public class UserController : Controller
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("api/1.0/users")]
        public async Task<IActionResult> All()
        {
            return Json(await _userService.All());
        }

        [HttpGet]
        [Route("api/1.0/users/{id}")]
        public async Task<IActionResult> Find([FromRoute]int id)
        {
            return Json(await _userService.Get(id));
        }

        [HttpGet]
        [Route("api/1.0/users/{id:int}/chats")]
        public async Task<IActionResult> Chats([FromRoute]int id, [FromQuery]int count, [FromQuery]int offset = 0)
        {
            var result = await _userService.Chats(id, new Pagination(count, offset));

            return Json(result);
        }

        [HttpGet]
        [Route("api/1.0/user/phone/{number}")]
        public async Task<IActionResult> ByPhone([FromRoute]string number)
        {
            return Json(await _userService.GetByPhone(number));
        }
    }
}
