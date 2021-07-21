using Microsoft.AspNetCore.Mvc;

namespace Telegram.Server.Web.Controllers
{
    public class WebsocketsController : Controller
    {
        [Route("example/websockets")]
        public IActionResult Index()
        {
            return View();
        }
    }
}