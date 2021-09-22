using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Extensions;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Web.Controllers.Api
{
    public class UserController : Controller
    {
        private readonly AppDb _db;

        private readonly DbSet<User> _users;

        public UserController(AppDb db)
        {
            _db = db;
            _users = _db.Users;
        }

        [HttpGet]
        [Route("api/1.0/users/{id}")]
        public IActionResult Find([FromRoute]int id)
        {
            var user = _users.Include(u => u.Phone)
                            .FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return Json(new RequestResult(false, $"User with id = {id}, not found."));
            }

            return Json(new RequestResult(true, new UserMap(user)));
        }

        [HttpGet]
        [Route("api/1.0/users/{id:int}/chats")]
        public IActionResult Chats([FromRoute]int id, [FromQuery]int count, [FromQuery]int offset = 0)
        {
            var result = _users.DetailChats(id, count, offset);

            return Json(new RequestResult(true, result));
        }

        [HttpGet]
        [Route("api/1.0/user/phone/{number}")]
        public IActionResult ByPhone([FromRoute]string number)
        {
            var user = _users.FirstOrDefault(u => u.Phone.Number == number);
            if (user == null)
            {
                return Json(
                    new RequestResult(
                        false,
                        $"User with phone number == {number} is not found"
                    )
                );
            }

            return Json(new RequestResult(true, user));
        }
    }
}
