using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Extensions;

namespace Telegram.Server.Web.Controllers.Api
{
    [Authorize]
    public class AuthorizedUserController : Controller
    {
        private readonly DbSet<User> _users;
        
        public AuthorizedUserController(AppDb db)
        {
            _users = db.Users;
        }

        [HttpGet]
        [Route("api/1.0/authorized-user/chats")]
        public IActionResult Chats([FromQuery]int count, [FromQuery]int offset = 0)
        {
            var result = _users.DetailChats(int.Parse(User.Identity.Name), count, offset);

            return Json(new RequestResult(true, result));
        }
    }
}