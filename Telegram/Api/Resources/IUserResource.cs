using System.Collections.Generic;
using System.Threading.Tasks;
using Telegram.Models;

namespace Telegram.Api.Resources
{
    public interface IUserResource
    {
        Task<List<Chat>> Chats(int count);
    }
}