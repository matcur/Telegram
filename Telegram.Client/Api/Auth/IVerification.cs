using System.Threading.Tasks;
using System.Windows.Media;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Auth
{
    public interface IVerification
    {
        Task<RequestResult> ByPhone(Phone phone);

        Task<RequestResult> FromTelegram(Phone phone);

        Task<bool> CheckCode(Code code);

        Task<RequestResult<string>> AuthorizationToken(Code code);
    }
}