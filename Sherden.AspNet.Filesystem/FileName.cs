using System.IO;
using Microsoft.AspNetCore.Http;

namespace Sherden.AspNet.Filesystem
{
    public abstract class FileName
    {
        public string Value(IFormFile file)
        {
            return Value(Path.GetExtension(file.FileName));
        }
        
        public abstract string Value(string extension);
    }
}