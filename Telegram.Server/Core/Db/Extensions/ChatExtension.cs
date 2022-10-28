using System.Linq;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Services.Controllers;

namespace Telegram.Server.Core.Db.Extensions
{
    public static class ChatExtension
    {
        public static IQueryable<Chat> DetailChats(this DbSet<Chat> source)
        {
            return source
                .Include(c => c.Members)
                .ThenInclude(c => c.User)
                .Include(c => c.Messages)
                .ThenInclude(m => m.ContentMessages)
                .ThenInclude(c => c.Content)
                .Select(c => new Chat
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    LastMessage = c.Messages.OrderByDescending(m => m.Id).FirstOrDefault(),
                    IconUrl = c.IconUrl,
                    Members = c.Members,
                    Messages = c.Messages,
                });
        }

        public static IQueryable<UserChat> DetailChats(this DbSet<Chat> source, int memberId)
        {
            return source
                .Include(c => c.Members)
                .ThenInclude(c => c.User)
                .Include(c => c.Messages)
                .ThenInclude(m => m.ContentMessages)
                .ThenInclude(c => c.Content)
                .Include(c => c.LastReadMessages)
                .Select(c => new UserChat
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    LastMessage = c.Messages.Where(m => m.Type == MessageType.UserMessage)
                        .OrderByDescending(m => m.Id)
                        .FirstOrDefault(),
                    IconUrl = c.IconUrl,
                    Members = c.Members,
                    UpdatedDate = c.UpdatedDate,
                    CreatorId = c.CreatorId,
                    LastReadMessageId = c.LastReadMessages.FirstOrDefault(m => m.UserId == memberId).MessageId,
                    UnreadMessageCount = c.Messages.Count(m => m.Type == MessageType.UserMessage)
                                         - c.Messages
                                             .Where(m => m.Type == MessageType.UserMessage)
                                             .Count(m => m.Id <= c.LastReadMessages
                                                 .FirstOrDefault(m => m.UserId == memberId).MessageId),
                    MemberCount = c.Members.Count(),
                })
                .Where(c => c.Members.Any(m => m.UserId == memberId) || c.CreatorId == memberId);
        }
    }
}