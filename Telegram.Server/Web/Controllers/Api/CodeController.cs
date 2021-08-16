using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Web.Controllers.Api
{
    public class CodeController : Controller
    {
        private readonly AppDb _db;

        private readonly DbSet<Code> _codes;

        private readonly DbSet<User> _users;

        public CodeController(AppDb db)
        {
            _db = db;
            _codes = db.Codes;
            _users = db.Users;
        }

        [HttpPost]
        [Route("api/1.0/codes")]
        public IActionResult Create([FromBody]int userId)
        {
            if (!_users.Any(u => u.Id == userId))
            {
                return Json(
                    new RequestResult(false, $"User with id = {userId} not found.")
                );
            }

            var code = new Code { UserId = userId };
            _codes.Add(code);
            _db.SaveChanges();

            return Json(new RequestResult(true));
        }
    }
}
