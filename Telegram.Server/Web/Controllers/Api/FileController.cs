using Sherden.AspNet.Filesystem.FileCollections;
using Sherden.AspNet.Filesystem.Files;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Telegram.Server.Core;

namespace Telegram.Server.Web.Controllers.Api
{
    public class FileController : Controller
    {
        [HttpPost]
        [Route("api/1.0/files")]
        public IActionResult Add(IFormFileCollection files)
        {
            var path = new FileCollection(files, "files").Save();

            return Json(new RequestResult(true, path));
        }
    }
}