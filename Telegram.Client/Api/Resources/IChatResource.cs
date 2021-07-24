using System.Collections.Generic;
using System.Threading.Tasks;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Resources
{
    public interface IChatResource
    {
        Task<RequestResult> AddMessage(Message message);

        Task<RequestResult<IEnumerable<Message>>> Messages(int offset, int count);
    }
}
