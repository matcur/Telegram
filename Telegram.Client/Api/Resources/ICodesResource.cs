using System.Threading.Tasks;

namespace Telegram.Client.Api.Resources
{
    public interface ICodesResource
    {
        Task Add(int userId);
    }
}