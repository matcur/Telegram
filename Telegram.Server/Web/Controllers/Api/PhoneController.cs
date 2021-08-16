using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Web.Controllers.Api
{
    public class PhoneController : Controller
    {
        private readonly AppDb _db;

        private readonly DbSet<Phone> _phones;

        public PhoneController(AppDb db)
        {
            _db = db;
            _phones = db.Phones;
        }

        [HttpGet]
        [Route("api/1.0/phones/{number}/exists")]
        public IActionResult Exists(string number)
        {
            var result = _phones.Any(p => p.Number == number);

            return Json(new RequestResult(true, result));
        }

        [Route("api/1.0/phones/{number}")]
        public IActionResult Find(string number)
        {
            var result = _phones.FirstOrDefault(p => p.Number == number);
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
