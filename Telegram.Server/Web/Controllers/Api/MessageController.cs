using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Telegram.Server.Core;
using Telegram.Server.Core.Attributes.Model;
using Telegram.Server.Core.Auth;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Domain;
using Telegram.Server.Core.Domain.Bots;
using Telegram.Server.Core.Mapping;
using Telegram.Server.Core.Notifications;
using Telegram.Server.Core.Services.Controllers;
using Telegram.Server.Core.Services.Hubs;
using Telegram.Server.Web.Hubs;

namespace Telegram.Server.Web.Controllers.Api
{
    [Authorize]
    public class MessageController : Controller
    {
        private readonly MessageService _messages;
        
        private readonly AuthorizedUserService _authorizedUser;

        public MessageController(MessageService messages, AuthorizedUserService authorizedUser)
        {
            _messages = messages;
            _authorizedUser = authorizedUser;
        }
        
        [HttpPost]
        [ModelValidation]
        [Route("api/1.0/messages/create")]
        public async Task<IActionResult> Add([FromForm]MessageMap map)
        {
            var message = await _messages.Add(map, await _authorizedUser.Get());

            return Json(new RequestResult(true, message));
        }

        [HttpPut]
        [ModelValidation]
        [Route("api/1.0/messages")]
        public async Task<IActionResult> Update([FromForm]UpdateMessageMap map)
        {
            var message = await _messages.Update(map);

            return Json(new RequestResult(true, message));
        }
    }
}