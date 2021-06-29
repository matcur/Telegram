using System.Threading.Tasks;
using Telegram.Models;

namespace Telegram.Api.Resources
{
    public interface IUsersResource
    {
        Task<User> Register(Phone phone);

        Task<User> Register(User user);
    }
}