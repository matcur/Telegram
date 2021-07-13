using System.Threading.Tasks;
using Telegram.Core.Models;

namespace Telegram.Api.Resources
{
    public interface IMessagesResource
    {
        Task Add(Message message);
        
        Task Update(Message message);
    }
}