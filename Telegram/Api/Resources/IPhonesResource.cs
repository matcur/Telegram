using System.Threading.Tasks;
using Telegram.Models;

namespace Telegram.Api.Resources
{
    public interface IPhonesResource
    {
        Task<bool> Exists(string number);

        Task<RequestResult<Phone>> Find(Phone phone);

        Task<RequestResult<Phone>> Find(string number);
    }
}