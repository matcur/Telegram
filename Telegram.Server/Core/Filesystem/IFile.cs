using System;
using System.Threading.Tasks;

namespace Telegram.Server.Core.Filesystem
{
    public interface IFile : IDisposable
    {
        Task<string> SaveAsync();

        Task<string> SaveAsync(string folder);
    }
}