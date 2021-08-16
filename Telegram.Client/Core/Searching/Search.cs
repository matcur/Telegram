using System;

namespace Telegram.Client.Core.Searching
{
    public abstract class Search<T>
    {
        public event Action<string> TextChanged = delegate { };

        public string Text
        {
            get => _text;
            set
            {
                _text = value;
                TextChanged(_text);
            }
        }

        public abstract T Filtered { get; }

        protected string _text = "";

        public abstract void AddItems(T items);
    }
}
