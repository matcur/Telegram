using System;
using System.Collections.Generic;
using Custom.AspNet.Filesystem.Files;
using Microsoft.AspNetCore.Http;

namespace Custom.AspNet.Filesystem.FileCollections
{
    public class ApplicationFiles : IAspFiles
    {
        private readonly IEnumerable<IFormFile> _files;
        
        private readonly Func<IFormFile, string> _fileCreation;

        public ApplicationFiles(IEnumerable<IFormFile> files, string folder)
            : this(files, file => new ApplicationFile(file, folder).Save())
        {

        }

        public ApplicationFiles(IEnumerable<IFormFile> files, Func<IFormFile, string> fileCreation)
        {
            _files = files;
            _fileCreation = fileCreation;
        }
        
        public IEnumerable<string> Save()
        {
            var paths = new List<string>();
            foreach (var file in _files)
            {
                paths.Add(_fileCreation.Invoke(file));
            }

            return paths;
        }
    }
}