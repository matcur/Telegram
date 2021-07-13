using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Api;
using Telegram.Server.Core.Attributes.Model;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Controllers.Api
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
