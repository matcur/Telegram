using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Telegram.Api;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Mapping;
using Telegram.Server.Core.Mapping.Response;

namespace Telegram.Server.Web.Controllers.Api
{
    public class RegistrationController : Controller
    {
        private readonly AppDb db;

        private readonly DbSet<User> users;

        public RegistrationController(AppDb db)
        {
            this.db = db;
            this.users = db.Users;
        }

        [HttpPost]
        [Route("api/1.0/user/register")]
        public IActionResult Register([FromBody]RegisteringUser registration)
        {
            var user = new User(registration);
            users.Add(user);
            db.SaveChanges();

            return Json(new RequestResult(true, new RegisteredUser(user)));
        }
    }
}