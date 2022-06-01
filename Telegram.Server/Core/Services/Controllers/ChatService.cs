using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Exceptions;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Core.Services.Controllers
{
    public class ChatService
    {
        private readonly UserService _users;
        
        private readonly AppDb _db;
        
        private readonly DbSet<Chat> _chats;

        public ChatService(UserService users, AppDb db)
        {
            _users = users;
            _db = db;
            _chats = db.Chats;
        }
        
        public async Task<Chat> Get(int id)
        {
            var chat = await _chats.FirstOrDefaultAsync(c => c.Id == id);
            if (chat == null)
            {
                throw new NotFoundException($"Chat with id = {id} not found.");
            }

            return chat;
        }

        public async Task<Chat> Create(ChatMap map)
        {
            var chat = new Chat(map);
            
            await _chats.AddAsync(chat);
            await _db.SaveChangesAsync();

            return chat;
        }

        public async Task AddMember(int chatId, int userId)
        {
            var memberTask = _users.Get(userId);
            var chatTask = Get(chatId);

            var member = await memberTask;
            var chat = await chatTask;
            
            chat.Members.Add(new ChatUser(member.Id));
            await _db.SaveChangesAsync();
        }

        public bool Exists(int id)
        {
            return _chats.Any(c => c.Id == id);
        }
    }
}