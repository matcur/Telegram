using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Http;

namespace Custom.AspNet.Filesystem.Files
{
    public class RandomFile : IAspFile
    {
        private readonly IFormFile _source;
        
        private readonly string _folder;
        
        public RandomFile(IFormFile source, string folder) 
        {
            _source = source;
            _folder = folder;
        }
        
        public string Save()
        {
            string path;
            do
            {
                var name = new RandomString().Value() + Path.GetExtension(_source.FileName);
                path = Path.Combine(_folder, name);
            } while (File.Exists(path));

            return new SimpleFile(
                _source, path
            ).Save();
        }
    }
}