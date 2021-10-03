﻿using System.Linq;
using System.Threading.Tasks;
using Custom.AspNet.Filesystem.Files;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core;
using Telegram.Server.Core.Attributes.Model;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Extensions;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Web.Controllers.Api
{
    public class ChatController : Controller
    {
        private AppDb _db;

        private DbSet<Chat> _chats;
        
        private DbSet<User> _users;

        private DbSet<Message> _messages;

        public ChatController(AppDb appDb)
        {
            _db = appDb;
            _chats = appDb.Chats;
            _users = appDb.Users;
            _messages = appDb.Messages;
        }
        
        [HttpGet]
        [Route("api/1.0/chats/{chatId:int}")]
        public IActionResult Find([FromRoute]int chatId)
        {
            var chat = _chats.FirstOrDefault(c => c.Id == chatId);
            if (chat == null)
            {
                return Json(new RequestResult(false, $"Chat with id = {chatId} does not exists"));
            }

            return Json(new RequestResult(true, chat));
        }

        [HttpGet]
        [Route("api/1.0/chats/{id:int}/messages")]
        public IActionResult Messages([FromRoute]int id, [FromQuery]int offset, [FromQuery]int count)
        {
            var chat = _chats.FirstOrDefault(c => c.Id == id);
            if (chat == null)
            {
                return Json(new RequestResult(false, $"Chat with id = {id} does not exists"));
            }

            var result = _messages
                .Details(chat)
                .Skip(offset)
                .Take(count)
                .ToList();
            result.Reverse();

            return Json(new RequestResult(true, result));
        }
        
        [HttpPost]
        [Route("api/1.0/chats/create")]
        public async Task<IActionResult> Create([FromForm]ChatMap map)
        {
            var chat = new Chat(map);
            _chats.Add(chat);
            await _db.SaveChangesAsync();

            return Json(new RequestResult(true, chat));
        }

        [HttpPost]
        [Route("api/1.0/chats/{chatId:int}/new-member/{userId:int}")]
        public async Task<IActionResult> AddMember([FromRoute]int chatId, [FromRoute]int userId)
        {
            // Todo refactor
            var memberTask = _users.FirstOrDefaultAsync(u => u.Id == userId);
            var chatTask = _chats.FirstOrDefaultAsync(c => c.Id == chatId);

            var member = await memberTask;
            var chat = await chatTask;
            if (member == null)
            {
                return Json(new RequestResult(false, $"User with id = {userId} does not exists"));
            }

            if (chat == null)
            {
                return Json(new RequestResult(false, $"Chat with id = {chatId} does not exists"));
            }
            
            chat.Members.Add(new ChatUser(member.Id));
            _db.SaveChanges();

            return Json(new RequestResult(true));
        }
    }
}
