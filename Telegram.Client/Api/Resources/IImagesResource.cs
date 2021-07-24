using System.Drawing;
using System.Threading.Tasks;

namespace Telegram.Api.Resources
{
    public interface IImagesResource
    {
        Task<RequestResult<string>> Add(Image image);
    }
}