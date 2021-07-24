using System.Collections.Generic;
using System.Collections.ObjectModel;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Core.Searching
{
    public class ChatSearch : Search<ObservableCollection<Chat>>
    {
        public override ObservableCollection<Chat> Filtered { get; }

        private readonly List<Chat> chats;

        public ChatSearch(IEnumerable<Chat> items)
        {
            chats = new List<Chat>(items);
            Filtered = new ObservableCollection<Chat>(items);
            TextChanged += Update;
        }

        public override void AddItems(ObservableCollection<Chat> items)
        {
            chats.AddRange(items);
            Update(text);
        }

        private void Update(string text)
        {
            this.text = text;
            Filtered.Clear();
            foreach (var chat in chats)
            {
                if (chat.Name.Contains(text) || string.IsNullOrEmpty(text))
                {
                    Filtered.Add(chat);
                }
            }
        }
    }
}
