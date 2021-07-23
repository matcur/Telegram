using System.Threading.Tasks;
using Telegram.Core.Models;

namespace Telegram.Api.Resources
{
    public interface IVerificationResource
    {
        Task<RequestResult> ByPhone(Phone phone);

        Task<RequestResult> FromTelegram(Phone phone);

        Task<bool> CheckCode(Code code);
    }
}