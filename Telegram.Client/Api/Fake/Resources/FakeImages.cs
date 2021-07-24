using System.Drawing;
using System.Threading.Tasks;
using Telegram.Client.Api.Resources;

namespace Telegram.Client.Api.Fake.Resources
{
    public class FakeImages : IImagesResource
    {
        public Task<RequestResult<string>> Add(Image image)
        {
            return null;
        }
    }
}