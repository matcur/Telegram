using System.Threading.Tasks;

namespace Telegram.Server.Core.Filesystem
{
    public interface IFile
    {
        Task<string> SaveAsync();

        Task<string> SaveAsync(string folder);
    }
}