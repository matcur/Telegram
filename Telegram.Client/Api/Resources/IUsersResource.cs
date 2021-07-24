using System.Threading.Tasks;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Resources
{
    public interface IUsersResource
    {
        Task<RequestResult<User>> Register(Phone phone);

        Task<RequestResult<User>> Register(User user);

        Task<RequestResult<User>> Find(Phone phone);
    }
}