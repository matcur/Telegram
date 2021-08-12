using System;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Web.Controllers.Api
{
    public class UserController : Controller
    {
        private readonly AppDb db;

        private readonly DbSet<User> users;

        public UserController(AppDb appDb)
        {
            db = appDb;
            users = db.Users;
        }

        [Route("fuck")]
        [Authorize]
        public IActionResult Index1()
        {
            return Json(User.Identity.Name);
        }

        [Route("api/1.0/users")]
        public IActionResult Index()
        {
            return Json(new { Users = users.ToList() });
        }

        [HttpGet]
        [Route("api/1.0/users/{id}")]
        public IActionResult Find(int id)
        {
            var user = users.Include(u => u.Phone)
                            .FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return Json(new RequestResult(false, $"User with id = {id}, not found."));
            }

            return Json(new RequestResult(true, new UserMap(user)));
        }

        [HttpGet]
        [Route("api/1.0/users/{id:int}/chats")]
        public IActionResult Chats(int id, int count)
        {
            var result = users.Where(u => u.Id == id)
                              .Include(u => u.Chats)
                              .ThenInclude(c => c.Messages)
                              .ThenInclude(m => m.Author)
                              .Include(u => u.Chats)
                              .ThenInclude(c => c.Messages)
                              .ThenInclude(m => m.Content)
                              .Select(u => u.Chats.Select(c => new Chat
                              {
                                  Id = c.Id,
                                  Name = c.Name,
                                  Description = c.Description,
                                  LastMessage = c.Messages.OrderByDescending(m => m.Id).FirstOrDefault(),
                                  IconUrl = c.IconUrl,
                              }))
                              .First();

            return Json(new RequestResult(true, result));
        }

        [HttpGet]
        [Route("api/1.0/user/phone/{number}")]
        public IActionResult ByPhone(string number)
        {
            var user = users.FirstOrDefault(u => u.Phone.Number == number);
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
