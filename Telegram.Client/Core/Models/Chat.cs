using System.Collections.ObjectModel;
using System.Drawing;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using Telegram.Client.Core.Collections;

namespace Telegram.Client.Core.Models
{
    public class Chat : Model
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string IconUrl { get; set; }

        public Image Icon { get; set; }

        public Message LastMessage { get; set; }
        
        public LiveCollection<Message> Messages { get; set; } = new LiveCollection<Message>();

        public ObservableCollection<User> Members { get; set; } = new ObservableCollection<User>();

        public Chat()
        {
            Messages.CollectionChanged += delegate { OnPropertyChanged(nameof(LastMessage)); };
        }
    }
}
