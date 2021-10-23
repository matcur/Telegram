using System.Linq;
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
        private readonly AppDb _db;
        
        private readonly DbSet<User> _users;
        
        public AuthorizedUserController(AppDb db)
        {
            _db = db;
            _users = db.Users;
        }

        [HttpGet]
        [Route("api/1.0/authorized-user/chats")]
        public IActionResult Chats([FromQuery]int count, [FromQuery]int offset = 0)
        {
            var result = _users.DetailChats(UserId(), count, offset);

            return Json(new RequestResult(true, result));
        }

        [HttpPost]
        [Route("api/1.0/authorized-user/avatar")]
        public IActionResult ChangeAvatar([FromQuery]string uri)
        {
            var user = _users.First(u => u.Id == UserId());

            user.AvatarUrl = uri;
            _db.Update(user);

            return Ok();
        }

        private int UserId()
        {
            return int.Parse(User.Identity.Name);
        }
    }
}