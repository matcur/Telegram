using System;
using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Http;

namespace Custom.AspNet.Filesystem.Files
{
    public class ApplicationFile : IAspFile
    {
        internal static string Root;
        
        private readonly IAspFile _source;

        public ApplicationFile(IFormFile source, string folder)
            : this(new RandomFile(source, Path.Combine(Root, folder)))
        {

        }

        public ApplicationFile(IAspFile source)
        {
            _source = source;
        }
        
        public string Save()
        {
            var path = _source.Save();
            var parts = path.Split($"{Root}");
            if (parts.Length == 1)
            {
                throw new Exception($"File path doesn't contains {Root}'.");
            }

            var applicationPath = parts[1];

            return applicationPath;
        }

        public void Remove()
        {
            _source.Remove();
        }
    }
}