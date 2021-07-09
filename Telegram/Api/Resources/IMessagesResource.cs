using System.Threading.Tasks;
using Telegram.Core.Models;

namespace Telegram.Api.Resources
{
    public interface IMessagesResource
    {
        Task Save(Message message);
        
        Task Update(Message message);
    }
}