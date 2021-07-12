using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Api;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Controllers.Api
{
    public class PhoneController : Controller
    {
        private readonly AppDb db;

        private readonly DbSet<Phone> phones;

        public PhoneController(AppDb db)
        {
            this.db = db;
            this.phones = db.Phones;
        }

        [HttpGet]
        [Route("api/1.0/phones/{number}/exists")]
        public IActionResult Exists(string number)
        {
            var result = phones.Any(p => p.Number == number);

            return Json(new RequestResult(true, result));
        }

        [Route("api/1.0/phones/{number}")]
        public IActionResult Find(string number)
        {
            var result = phones.FirstOrDefault(p => p.Number == number);
            if (result == null)
            {
                return Json(
                    new RequestResult(
                        false,
                        $"Phone with number = {number}, not found."
                    )
                );
            }

            return Json(new RequestResult(true, result));
        }
    }
}
