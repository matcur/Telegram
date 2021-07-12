using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Core.Models;

namespace Telegram.Api.Resources
{
    public interface IChatsResource
    {
        Task<IEnumerable<Chat>> Iterate(User user, int count);

        Task<RequestResult> Add(Chat chat);
    }
}