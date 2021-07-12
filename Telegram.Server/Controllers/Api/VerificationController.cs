using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Api;
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
                return Json(
                    new RequestResult(
                        false,
                        $"Phone number {map.Number} - {map.OwnerId} doesn't exists."
                    )
                );
            }

            codes.Add(new Code { UserId = phone.OwnerId });
            db.SaveChanges();

            return Json(new RequestResult(true));
        }

        [HttpPost]
        [Route("api/1.0/verification/from-telegram")]
        public IActionResult FromTelegram([FromBody]PhoneMap map)
        {
            var phone = phones.FirstOrDefault(p => p.Number == map.Number);
            if (phone == null)
            {
                return Json(
                    new RequestResult(
                        false,
                        $"Phone number {map.Number} doesn't exists."
                    )    
                );
            }

            codes.Add(new Code { UserId = phone.OwnerId });
            db.SaveChanges();

            return Json(new RequestResult(true));
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
                return Json(new RequestResult(true, true));
            }

            return Json(new RequestResult(true, false));
        }

        [HttpGet]
        [Route("api/1.0/codes")]
        public IActionResult Codes()
        {
            return Json(codes.ToList());
        }
    }
}
