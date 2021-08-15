using System.Security.Cryptography;
using System.Threading.Tasks;
using Telegram.Client.Api.Auth;
using Telegram.Client.Api.Fake.Resources;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Fake.Auth
{
    public class FakeVerification : ApiResource, IVerification
    {
        private readonly IApiClient api;

        public FakeVerification(IApiClient api)
        {
            this.api = api;
        }

        public async Task<RequestResult> FromTelegram(Phone phone)
        {
            var response = await api.Post(
                "verification/from-telegram", Serialize(phone)
            );

            return Deserialize(response);
        }

        public async Task<RequestResult> ByPhone(Phone phone)
        {
            var response = await api.Post(
                "verification/by-phone", Serialize(phone)
            );
            
            return Deserialize(response);
        }

        public async Task<bool> CheckCode(Code code)
        {
            var response = await api.Get(
                $"verification/check-code?Value={code.Value}&UserId={code.UserId}"
            );

            return Deserialize<bool>(response).Result;
        }

        public async Task<RequestResult<string>> AuthorizationToken(Code code)
        {
            var response = await api.Get(
                $"verification/authorization-token?value={code.Value}&UserId={code.UserId}"
            );

            return Deserialize<string>(response);
        }
    }
}
