﻿using System;

namespace Telegram.Client.Core.Searching
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

        public abstract void AddItems(T items);
    }
}
