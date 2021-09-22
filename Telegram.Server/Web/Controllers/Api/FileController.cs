using Custom.AspNet.Filesystem.Files;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Telegram.Server.Core;

namespace Telegram.Server.Web.Controllers.Api
{
    public class FileController : Controller
    {
        [HttpPost]
        [Route("api/1.0/file")]
        public IActionResult Add(IFormFile file)
        {
            var path = new ApplicationFile(file, "wwwroot\\files").Save();

            return Json(new RequestResult(true, (object)path));
        }
    }
}