using System.Threading.Tasks;

namespace Telegram.Api.Filesystem
{
    public interface IFile
    {
        Task<string> SaveAsync();

        Task<string> SaveAsync(string folder);
    }
}