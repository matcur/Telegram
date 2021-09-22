using System;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace Custom.AspNet.Filesystem.Files
{
    public class PublicFile : IAspFile
    {
        private readonly IAspFile _source;

        public PublicFile(IFormFile source, string folder)
            : this(new ApplicationFile(source, folder))
        {

        }

        public PublicFile(IAspFile source)
        {
            _source = source;
        }
        
        public string Save()
        {
            var path = _source.Save();
            var parts = path.Split(@"wwwroot\");
            if (parts.Length == 1)
            {
                throw new Exception(@"File path doesn't contains '\wwwroot'.");
            }

            var publicPath = parts[1];

            return publicPath;
        }
    }
}