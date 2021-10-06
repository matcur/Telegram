using System.IO;
using Microsoft.Extensions.DependencyInjection;
using Sherden.AspNet.Filesystem.Files;

namespace Sherden.AspNet.Filesystem
{
    public static class ServiceExtension
    {
        public static void AddFileSystem(this IServiceCollection services, string wwwrootPath)
        {
            ApplicationFile.Root = Path.GetFullPath(
                Path.Combine(wwwrootPath, @"..")
            );
        }
    }
}