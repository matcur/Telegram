﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Telegram.Api;
using Telegram.Server.Core;
using Telegram.Server.Core.Attributes.Model;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Controllers.Api
{
    public class ChatController : Controller
    {
        private AppDb db;

        private DbSet<Chat> chats;
        
        private DbSet<User> users;

        private DbSet<Message> messages;

        public ChatController(AppDb appDb)
        {
            db = appDb;
            chats = appDb.Chats;
            users = appDb.Users;
            messages = appDb.Messages;
        }
        
        [HttpGet]
        [Route("api/1.0/chats/{chatId:int}")]
        public IActionResult Find(int chatId)
        {
            var chat = chats.FirstOrDefault(c => c.Id == chatId);
            if (chat == null)
            {
                return Json(new RequestResult(false, $"Chat with id = {chatId} does not exists"));
            }

            return Json(new RequestResult(true, chat));
        }

        [HttpGet]
        [Route("api/1.0/chats/{chatId:int}/messages")]
        public IActionResult Messages(int chatId, int offset, int count)
        {
            if (!chats.Any(c => c.Id == chatId))
            {
                return Json(new RequestResult(false, $"Chat with id = {chatId} does not exists"));
            }

            var result = messages.Where(m => m.ChatId == chatId)
                                 .Skip(offset)
                                 .Take(count)
                                 .ToList();

            return Json(new RequestResult(true, result));
        }
        
        [HttpPost]
        [Route("api/1.0/chats/create")]
        [ModelValidation]
        public IActionResult Create([FromBody]ChatMap map)
        {
            var chat = new Chat(map);
            
            chats.Add(chat);
            db.SaveChanges();

            return Json(new RequestResult(true));
        }

        [HttpPost]
        [Route("api/1.0/chats/{chatId:int}/new-member/{userId:int}")]
        public async Task<IActionResult> AddMember(int chatId, int userId)
        {
            // Todo refactor
            var memberTask = users.FirstOrDefaultAsync(u => u.Id == userId);
            var chatTask = chats.FirstOrDefaultAsync(c => c.Id == chatId);

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
            
            chat.Members.Add(member);
            db.SaveChanges();

            return Json(new RequestResult(true));
        }
    }
}
