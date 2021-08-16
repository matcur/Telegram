using System;
using System.Threading.Tasks;

namespace Telegram.Server.Core.Filesystem
{
    public class PublicFile : IFile
    {
        private readonly IFile _file;

        public PublicFile(IFile file)
        {
            _file = file;
        }

        public async Task<string> SaveAsync()
        {
            var fullPath = await _file.SaveAsync();
            
            return PublicPath(fullPath);
        }

        public async Task<string> SaveAsync(string folder)
        {
            var fullPath = await _file.SaveAsync(folder);

            return PublicPath(fullPath);
        }

        public void Dispose()
        {
            _file?.Dispose();
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