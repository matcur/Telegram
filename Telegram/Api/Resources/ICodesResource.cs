using System.Threading.Tasks;

namespace Telegram.Api.Resources
{
    public interface ICodesResource
    {
        Task Add(int userId);
    }
}