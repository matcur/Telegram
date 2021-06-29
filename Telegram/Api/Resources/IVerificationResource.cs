using System.Threading.Tasks;
using Telegram.Models;

namespace Telegram.Api.Resources
{
    public interface IVerificationResource
    {
        Task<RequestResult> ByPhone(Phone phone);

        Task<bool> CheckCode(Code code);

        Task<bool> FromTelegram(Phone phone);
    }
}