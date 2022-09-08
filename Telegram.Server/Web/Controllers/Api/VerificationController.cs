using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Auth;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;

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
        public IActionResult ByPhone([FromQuery]string number)
        {
            var phone = _phones.FirstOrDefault(p => p.Number == number);
            if (phone == null)
            {
                return NotFound($"Phone number {number} - {number} doesn't exists.");
            }

            _codes.Add(new Code { UserId = phone.OwnerId });
            _db.SaveChanges();

            return Ok();
        }

        [HttpPost]
        [Route("api/1.0/verification/from-telegram")]
        public IActionResult FromTelegram([FromQuery]string number)
        {
            var phone = _phones.FirstOrDefault(p => p.Number == number);
            if (phone == null)
            {
                return NotFound($"Phone number {number} doesn't exists.");
            }

            _codes.Add(new Code { UserId = phone.OwnerId });
            _db.SaveChanges();

            return Ok();
        }

        [HttpGet]
        [Route("api/1.0/verification/check-code")]
        public async Task<IActionResult> CheckCode([FromQuery]string value, [FromQuery]int userId)
        {
            var valid = await _identity.ValidCode(value, userId);

            return Json(valid);
        }

        [HttpGet]
        [Route("api/1.0/verification/authorization-token")]
        public async Task<IActionResult> AuthorizationToken([FromQuery]string value, [FromQuery]int userId)
        {
            if (!await _identity.ValidCode(value, userId))
            {
                return BadRequest("Wrong code");
            }

            var token =  await _identity.CreateToken(userId, "simpleUser");
            await _identity.ForgotCode(value, userId);

            return Json(token);
        }
    }
}
