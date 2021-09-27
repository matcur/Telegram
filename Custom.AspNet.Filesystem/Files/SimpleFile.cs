using System;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace Custom.AspNet.Filesystem.Files
{
    public class SimpleFile : IAspFile
    {
        private readonly IFormFile _source;
        
        private readonly string _path;

        public SimpleFile(IFormFile source, string folder, string name)
            : this(source, Path.Combine(folder, name))
        {

        }

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

        public void Remove()
        {
            if (!File.Exists(_path))
            {
                throw new Exception($"File {_path} doesn't exists.");
            }
            
            File.Delete(_path);
        }
    }
}