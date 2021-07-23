using System.Threading.Tasks;
using Telegram.Core.Models;

namespace Telegram.Api.Resources
{
    public interface IUsersResource
    {
        Task<RequestResult<User>> Register(Phone phone);

        Task<RequestResult<User>> Register(User user);

        Task<RequestResult<User>> Find(Phone phone);
    }
}