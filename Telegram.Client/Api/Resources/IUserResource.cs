using System.Collections.Generic;
using System.Threading.Tasks;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Resources
{
    public interface IUserResource
    {
        Task<IEnumerable<Chat>> Chats(int count);
    }
}