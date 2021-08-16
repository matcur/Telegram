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
        public IActionResult ByPhone([FromBody]PhoneMap map)
        {
            var phone = _phones.FirstOrDefault(p => p.Number == map.Number);
            if (phone == null)
            {
                return Json(
                    new RequestResult(
                        false,
                        $"Phone number {map.Number} - {map.OwnerId} doesn't exists."
                    )
                );
            }

            _codes.Add(new Code { UserId = phone.OwnerId });
            _db.SaveChanges();

            return Json(new RequestResult(true));
        }

        [HttpPost]
        [Route("api/1.0/verification/from-telegram")]
        public IActionResult FromTelegram([FromBody]PhoneMap map)
        {
            var phone = _phones.FirstOrDefault(p => p.Number == map.Number);
            if (phone == null)
            {
                return Json(
                    new RequestResult(
                        false,
                        $"Phone number {map.Number} doesn't exists."
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
            if (_identity.IsValid(value, userId))
            {
                return Json(new RequestResult(true, true));
            }

            return Json(new RequestResult(true, false));
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
