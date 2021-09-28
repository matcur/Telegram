using System.IO;
using Custom.AspNet.Filesystem.Files;
using Microsoft.Extensions.DependencyInjection;

namespace Custom.AspNet.Filesystem
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