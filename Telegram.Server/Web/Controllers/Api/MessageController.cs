using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Web.Controllers.Api
{
    public class MessageController : Controller
    {
        private readonly AppDb db;

        private readonly DbSet<Message> messages;

        public MessageController(AppDb appDb)
        {
            db = appDb;
            messages = db.Messages;
        }
    }
}
