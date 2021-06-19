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

        [Route("api/1.0/verification/by-phone")]
        [HttpPost]
        public IActionResult ByPhone([FromBody]PhoneMap map)
        {
            var phone = phones.FirstOrDefault(p => p.Number == map.Number);
            if (phone == null)
            {
                return Json(
                    new 
                    { 
                        Success = false, 
                        ErrorMessage = $"Phone number {map.Number} - {map.OwnerId} doesn't exists.",
                    }
                );
            }

            codes.Add(new Code { UserId = phone.OwnerId });
            db.SaveChanges();

            return Json(new { Success = true, ErrorMessage = "" });
        }

        [Route("api/1.0/verification/from-telegram")]
        [HttpPost]
        public IActionResult FromTelegram([FromBody]PhoneMap map)
        {
            var dbPhone = phones.FirstOrDefault(p => true);
            if (dbPhone == null)
            {
                return Json(
                    new
                    {
                        Success = false,
                        ErrorMessage = $"Phone number {map.Number} doesn't exists.",
                    }
                );
            }

            codes.Add(new Code { User = dbPhone.Owner });
            db.SaveChanges();

            return Json(new { Success = true, ErrorMessage = "" });
        }
    }
}
