using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Mapping
{
    public class CodeMap
    {
        public string Value { get; set; }

        public bool Entered { get; set; }

        public CodeMap() { }

        public CodeMap(Code code)
        {
            Value = code.Value;
        }
    }
}