using System.IO;
using Microsoft.AspNetCore.Http;

namespace Custom.AspNet.Filesystem.Files
{
    public class SimpleFile : IAspFile
    {
        private readonly IFormFile _source;
        
        private readonly string _path;

        public SimpleFile(IFormFile source, string path)
        {
            _source = source;
            _path = path;
        }
        
        public string Save()
        {
            using (var stream = File.Create(_path))
            {
                _source.CopyTo(
                    stream
                );
            }

            return _path;
        }
    }
}