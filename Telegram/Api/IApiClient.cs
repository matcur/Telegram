using System.Net.Http;
using System.Threading.Tasks;

namespace Telegram.Api
{
    public interface IApiClient
    {
        Task<string> Get(string resource);

        Task<string> Post(string resource, HttpContent body);
    }
}