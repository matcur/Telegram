using System.Linq;
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
        public IActionResult All()
        {
            return Json(_userService.All());
        }

        [HttpGet]
        [Route("api/1.0/users/{id}")]
        public IActionResult Find([FromRoute]int id)
        {
            if (_userService.TryFind(id, out var user))
            {
                return Json(new RequestResult(true, new UserMap(user)));
            }

            return NotFound($"User with id = {id}, not found.");
        }

        [HttpGet]
        [Route("api/1.0/users/{id:int}/chats")]
        public IActionResult Chats([FromRoute]int id, [FromQuery]int count, [FromQuery]int offset = 0)
        {
            var result = _userService.Chats(id, new Pagination(count, offset));

            return Json(new RequestResult(true, result));
        }

        [HttpGet]
        [Route("api/1.0/user/phone/{number}")]
        public IActionResult ByPhone([FromRoute]string number)
        {
            if (_userService.TryFindByPhone(number, out var user))
            {
                return Json(new RequestResult(true, user));
            }

            return NotFound($"User with phone number == {number} is not found");
        }
    }
}
