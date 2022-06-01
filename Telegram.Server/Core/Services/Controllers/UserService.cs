using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Exceptions;

namespace Telegram.Server.Core.Services.Controllers
{
    public class UserService
    {
        private readonly DbSet<User> _users;

        private readonly AppDb _db;

        public UserService(AppDb db)
        {
            _db = db;
            _users = _db.Users;
        }

        public bool TryFind(int id, out User user)
        {
            user = _users.Include(u => u.Phone)
                .FirstOrDefault(u => u.Id == id);

            return user != null;
        }

        public async Task<User> Get(int id)
        {
            var chat = await _users.Include(u => u.Phone)
                .FirstOrDefaultAsync(c => c.Id == id);
            if (chat == null)
            {
                throw new NotFoundException($"User with id = {id} not found.");
            }

            return chat;
        }

        public bool TryFindByPhone(string number, out User user)
        {
            user = _users
                .Include(u => u.Phone)
                .FirstOrDefault(u => u.Phone.Number == number);

            return user != null;
        }

        public IEnumerable<Chat> Chats(int userId, Pagination pagination)
        {
            return _users
                .Where(u => u.Id == userId)
                .Include(u => u.Chats)
                .ThenInclude(c => c.Chat.Messages)
                .ThenInclude(m => m.Author)
                .Include(u => u.Chats)
                .ThenInclude(c => c.Chat.Messages)
                .ThenInclude(m => m.ContentMessages)
                .ThenInclude(c => c.Content)
                .Select(u => u.Chats.Select(c => new Chat
                {
                    Id = c.Chat.Id,
                    Name = c.Chat.Name,
                    Description = c.Chat.Description,
                    LastMessage = c.Chat.Messages.OrderByDescending(m => m.Id).FirstOrDefault(),
                    IconUrl = c.Chat.IconUrl,
                }))
                .First();
        }
    }
}