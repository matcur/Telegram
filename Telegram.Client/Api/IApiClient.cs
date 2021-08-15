using System.Net.Http;
using System.Threading.Tasks;

namespace Telegram.Client.Api
{
    public interface IApiClient
    {
        string Host { get; }

        Task<string> Get(string resource);

        Task<string> Post(string resource, HttpContent body);

        void AddHeader(string key, string value);
    }
}