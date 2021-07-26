using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Telegram.Server.Core.Filesystem
{
    public class RandomFile : IFile
    {
        private readonly Stream stream;
        
        private readonly string extension;

        public RandomFile(IFormFile file)
        {
            extension = Path.GetExtension(file.FileName);
            stream = file.OpenReadStream();
        }

        public async Task<string> SaveAsync()
        {
            var folder = Path.Combine(
                Directory.GetCurrentDirectory(),
                @"wwwroot/files/"
            );

            return await SaveAsync(folder);
        }

        public async Task<string> SaveAsync(string folder)
        {
            var fullPath = Path.Combine(
                folder,
                Path.GetFileName(RandomName() + extension)
            );

            await stream.CopyToAsync(
                File.Create(fullPath)
            );

            return fullPath;
        }

        public void Dispose()
        {
            stream?.Dispose();
        }

        private string RandomName()
        {
            var name = Convert.ToBase64String(
                BitConverter.GetBytes(new Random().Next())
            );

            return name.Replace("/", "");
        }

        ~ RandomFile()
        {
            Dispose();  
        }
    }
}