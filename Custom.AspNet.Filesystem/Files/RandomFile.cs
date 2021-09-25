using System;
using System.IO;
using Custom.AspNet.Filesystem.FileNames;
using Microsoft.AspNetCore.Http;

namespace Custom.AspNet.Filesystem.Files
{
    public class RandomFile : IAspFile
    {
        private readonly FileName _fileName;
        
        private readonly IFormFile _source;
        
        private readonly string _folder;

        public RandomFile(IFormFile source, string folder)
            : this(source, folder, new RandomFileName())
        {
        }
        
        public RandomFile(IFormFile source, string folder, FileName fileName)
        {
            _source = source;
            _folder = folder;
            _fileName = fileName;
        }
        
        public string Save()
        {
            string path;
            var @try = 0;
            do
            {
                var name = _fileName.Value(_source);
                path = Path.Combine(_folder, name);

                @try++;
                if (@try > 50)
                {
                    throw new Exception(
                        $"Can't get free file name. Probably {_fileName.GetType()} always returns the same value."
                    );
                }
            } while (File.Exists(path));

            return new SimpleFile(
                _source, path
            ).Save();
        }
    }
}