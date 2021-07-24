using System.Threading.Tasks;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Resources
{
    public interface IPhonesResource
    {
        Task<bool> Exists(string number);

        Task<RequestResult<Phone>> Find(Phone phone);

        Task<RequestResult<Phone>> Find(string number);
    }
}