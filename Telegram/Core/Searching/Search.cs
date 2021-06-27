using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telegram.Core.Searching
{
    public abstract class Search<T>
    {
        public event Action<string> TextChanged = delegate { };

        public string Text
        {
            get => text;
            set
            {
                text = value;
                TextChanged(text);
            }
        }

        public abstract T Filtered { get; }

        protected string text = "";
    }
}
