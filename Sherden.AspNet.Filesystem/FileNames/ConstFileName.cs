using System.IO;
using Microsoft.AspNetCore.Http;

namespace Sherden.AspNet.Filesystem.FileNames
{
    public class ConstFileName : FileName
    {
        private readonly string _value;

        public ConstFileName(string value)
        {
            _value = value;
        }
        
        public override string Value(string extension)
        {
            return _value + extension;
        }
    }
}