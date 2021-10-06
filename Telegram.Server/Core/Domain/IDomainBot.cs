using System.Threading.Tasks;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Domain
{
    public interface IDomainBot
    {
        Task Act(Message message);
    }
}