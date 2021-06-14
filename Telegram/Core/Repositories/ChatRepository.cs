using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Db;
using Telegram.Db.Models;
using Telegram.Models;

namespace Telegram.Core.Repositories
{
    class ChatRepository
    {
        private readonly AppDb db;

        private readonly DbChat chat;

        public ChatRepository(AppDb db, DbChat chat)
        {
            this.db = db;
            this.chat = chat;
        }

        public Task Add(Message message)
        {

        }
    }
}
