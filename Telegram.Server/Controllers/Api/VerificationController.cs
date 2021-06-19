using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Controllers.Api
{
    public class VerificationController : Controller
    {
        private readonly AppDb db;

        private readonly DbSet<Chat> chats;

        private readonly DbSet<Phone> phones;

        private readonly DbSet<Code> codes;

        public VerificationController(AppDb db)
        {
            this.db = db;
            this.chats = db.Chats;
            this.phones = db.Phones;
            this.codes = db.Codes;
        }

        [HttpPost]
        [Route("api/1.0/verification/by-phone")]
        public IActionResult ByPhone([FromBody]PhoneMap map)
        {
            var phone = phones.FirstOrDefault(p => p.Number == map.Number);
            if (phone == null)
            {
                return Json(new 
                {
                    Success = false, 
                    ErrorMessage = $"Phone number {map.Number} - {map.OwnerId} doesn't exists.",
                });
            }

            codes.Add(new Code { UserId = phone.OwnerId });
            db.SaveChanges();

            return Json(new { Success = true, ErrorMessage = "" });
        }

        [HttpPost]
        [Route("api/1.0/verification/from-telegram")]
        public IActionResult FromTelegram([FromBody]PhoneMap map)
        {
            var phone = phones.FirstOrDefault(p => p.Number == map.Number);
            if (phone == null)
            {
                return Json(new
                {
                    Success = false,
                    ErrorMessage = $"Phone number {map.Number} doesn't exists.",
                });
            }

            codes.Add(new Code { UserId = phone.OwnerId });
            db.SaveChanges();

            return Json(new { Success = true, ErrorMessage = "" });
        }

        [HttpGet]
        [Route("api/1.0/verification/check-code")]
        public IActionResult CheckCode([FromQuery]VerificatingCode code)
        {
            if (codes.Any(
                c => code.Value == c.Value &&
                c.UserId == code.UserId &&
                !c.Entered
            ))
            {
                return Json(new
                {
                    Success = true,
                    ErrorMessage = "",
                });
            }

            return Json(new
            {
                Success = false,
                ErrorMessage = $"Code {code.Value} is not right",
            });
        }
    }
}
