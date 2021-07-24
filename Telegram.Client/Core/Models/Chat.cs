using System.Collections.ObjectModel;

namespace Telegram.Client.Core.Models
{
    public class Chat : Model
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public Message LastMessage { get; set; }
        
        public string ImagePath { get; set; }

        public ObservableCollection<Message> Messages { get; set; } = new ObservableCollection<Message>();

        public ObservableCollection<User> Members { get; set; } = new ObservableCollection<User>();

        public Chat()
        {
            Messages.CollectionChanged += delegate { OnPropertyChanged(nameof(LastMessage)); };
        }
    }
}
