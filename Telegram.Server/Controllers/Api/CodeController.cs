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
    public class CodeController : Controller
    {
        private readonly AppDb db;

        private readonly DbSet<Code> codes;

        private readonly DbSet<User> users;

        public CodeController(AppDb db)
        {
            this.db = db;
            this.codes = db.Codes;
            this.users = db.Users;
        }

        [HttpPost]
        [Route("api/1.0/codes")]
        public IActionResult Create([FromBody]int userId)
        {
            if (!users.Any(u => u.Id == userId))
                return Json(new { Success = false, ErrorMessage = $"User with id = {userId} not found." });

            var code = new Code { UserId = userId };
            codes.Add(code);
            db.SaveChanges();

            return Json(new { Success = true, ErrorMessage = "" });
        }
    }
}
