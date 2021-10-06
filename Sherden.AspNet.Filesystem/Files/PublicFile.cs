using System;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace Sherden.AspNet.Filesystem.Files
{
    public class PublicFile : IAspFile
    {
        private readonly IAspFile _source;

        public PublicFile(IFormFile source, string folder, string name)
            : this(new ApplicationFile(source, folder, name))
        {

        }

        public PublicFile(IFormFile source, string folder)
            : this(new ApplicationFile(source, Path.Combine("wwwroot", folder)))
        {

        }

        public PublicFile(IAspFile source)
        {
            _source = source;
        }
        
        public string Save()
        {
            var path = _source.Save();
            var parts = path.Split(@"wwwroot");
            if (parts.Length == 1)
            {
                throw new Exception(@"File path doesn't contains 'wwwroot'.");
            }

            var publicPath = parts[1].Replace(@"\", "/");

            return publicPath;
        }

        public void Remove()
        {
            _source.Remove();
        }
    }
}