using System.Threading.Tasks;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Resources
{
    public interface IMessagesResource
    {
        Task Update(Message message);
    }
}