using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Controllers.Api
{
    public class UserController : Controller
    {
        private readonly AppDb db;

        private readonly DbSet<User> users;

        private readonly DbSet<Chat> chats;

        public UserController(AppDb db)
        {
            this.db = db;
            this.users = db.Users;
            this.chats = db.Chats;
        }

        [HttpGet]
        [Route("api/1.0/users/{id:int}")]
        public IActionResult Find(int id)
        {
            var result = users.Find(id);
            if (result == null)
            {
                Response.StatusCode = 204;

                return Json(new { Erorr = $"User with id = {id}, not found." });
            }

            return Json(result);
        }

        [HttpGet]
        [Route("api/1.0/users/{id:int}/chats")]
        public IActionResult Chats(int id, int count)
        {
            var result = chats.Where(c => c.Members.Select(m => m.Id).Contains(id))
                              .Take(count)
                              .ToList();

            return Json(result);
        }
    }
}
