using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Telegram.Server.Controllers.Api
{
    public class MessageController : Controller
    {
        [HttpPost]
        [Route("api/1.0/messages")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
