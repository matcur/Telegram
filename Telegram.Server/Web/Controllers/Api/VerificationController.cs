using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core;
using Telegram.Server.Core.Auth;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Web.Controllers.Api
{
    public class VerificationController : Controller
    {
        private readonly AppDb _db;
        
        private readonly UserIdentity _identity;

        private readonly DbSet<Phone> _phones;

        private readonly DbSet<Code> _codes;

        public VerificationController(AppDb db, UserIdentity identity)
        {
            _db = db;
            _identity = identity;
            _phones = db.Phones;
            _codes = db.Codes;
        }

        [HttpPost]
        [Route("api/1.0/verification/by-phone")]
        public IActionResult ByPhone(string number)
        {
            var phone = _phones.FirstOrDefault(p => p.Number == number);
            if (phone == null)
            {
                return Json(
                    new RequestResult(
                        false,
                        $"Phone number {number} - {number} doesn't exists."
                    )
                );
            }

            _codes.Add(new Code { UserId = phone.OwnerId });
            _db.SaveChanges();

            return Json(new RequestResult(true));
        }

        [HttpPost]
        [Route("api/1.0/verification/from-telegram")]
        public IActionResult FromTelegram([FromQuery]string number)
        {
            var phone = _phones.FirstOrDefault(p => p.Number == number);
            if (phone == null)
            {
                return Json(
                    new RequestResult(
                        false,
                        $"Phone number {number} doesn't exists."
                    )    
                );
            }

            _codes.Add(new Code { UserId = phone.OwnerId });
            _db.SaveChanges();

            return Json(new RequestResult(true));
        }

        [HttpGet]
        [Route("api/1.0/verification/check-code")]
        public IActionResult CheckCode([FromQuery]string value, [FromQuery]int userId)
        {
            var valid = _identity.IsValid(value, userId);

            return Json(new RequestResult(true, valid));
        }

        [HttpGet]
        [Route("api/1.0/verification/authorization-token")]
        public IActionResult AuthorizationToken([FromQuery]string value, [FromQuery]int userId)
        {
            if (_identity.IsValid(value, userId))
            {
                return Json(new RequestResult<string>(true, _identity.Token(userId), ""));
            }

            return Json(new RequestResult(true, false));
        }
    }
}
