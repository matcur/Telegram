using System.IO;
using Microsoft.AspNetCore.Http;

namespace Custom.AspNet.Filesystem.FileNames
{
    public class SimpleFileName : FileName
    {
        private readonly string _value;

        public SimpleFileName(string value)
        {
            _value = value;
        }
        
        public override string Value(string extension)
        {
            return _value + extension;
        }
    }
}