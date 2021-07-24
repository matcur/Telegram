using System.Drawing;
using System.Threading.Tasks;
using Telegram.Api.Resources;

namespace Telegram.Api.Fake.Resources
{
    public class FakeImages : IImagesResource
    {
        public Task<RequestResult<string>> Add(Image image)
        {
            return null;
        }
    }
}