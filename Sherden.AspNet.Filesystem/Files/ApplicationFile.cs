using System;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace Sherden.AspNet.Filesystem.Files
{
    public class ApplicationFile : IAspFile
    {
        internal static string Root
        {
            get
            {
                if (_root == null)
                {
                    throw new Exception(
                        "Call services.AddFileSystem before using Sherden.AspNet.Filesystem.Files classes."
                    );
                }
                
                return _root;
            }
            set => _root = value;
        }

        private static string _root;

        private readonly IAspFile _source;
        
        public ApplicationFile(IFormFile source, string folder, string name)
            : this(new SimpleFile(source, folder, name))
        {

        }

        public ApplicationFile(IFormFile source, string folder)
            : this(new RandomFile(source, Path.Combine(Root, folder)))
        {

        }

        public ApplicationFile(string path)
            : this(new SimpleFile(Path.Combine(Root, path)))
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