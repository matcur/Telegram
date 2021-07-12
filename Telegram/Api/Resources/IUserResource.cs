using System.Collections.Generic;
using System.Threading.Tasks;
using Telegram.Core.Models;

namespace Telegram.Api.Resources
{
    public interface IUserResource
    {
        Task<RequestResult<List<Chat>>> Chats(int count);
    }
}