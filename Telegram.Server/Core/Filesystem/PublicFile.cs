using System;
using System.Threading.Tasks;

namespace Telegram.Server.Core.Filesystem
{
    public class PublicFile : IFile
    {
        private readonly IFile file;

        public PublicFile(IFile file)
        {
            this.file = file;
        }

        public async Task<string> SaveAsync()
        {
            var fullPath = await file.SaveAsync();
            
            return PublicPath(fullPath);
        }

        public async Task<string> SaveAsync(string folder)
        {
            var fullPath = await file.SaveAsync(folder);

            return PublicPath(fullPath);
        }

        public void Dispose()
        {
            file?.Dispose();
        }

        private string PublicPath(string path)
        {
            var publicIndex = path.IndexOf(@"files", StringComparison.Ordinal);
            
            return path.Remove(0, publicIndex);
        }

        ~ PublicFile()
        {
          Dispose();  
        }
    }
}