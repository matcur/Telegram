using System.Collections.ObjectModel;
using System.Drawing;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace Telegram.Client.Core.Models
{
    public class Chat : Model
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string IconPath { get; set; }

        public Image Icon { get; set; }

        public Message LastMessage { get; set; }
        
        public ObservableCollection<Message> Messages { get; set; } = new ObservableCollection<Message>();

        public ObservableCollection<User> Members { get; set; } = new ObservableCollection<User>();

        public Chat()
        {
            Messages.CollectionChanged += delegate { OnPropertyChanged(nameof(LastMessage)); };
        }

        public HttpContent ToHttpContent()
        {
            var content = new MultipartFormDataContent();
            var streamContent = new StreamContent(
                new FileStream(IconPath, FileMode.Open)
            );
            content.Add(streamContent,
                nameof(Icon),
                Path.GetFileName(IconPath)
            );
            content.Add(
                new StringContent(Name),
                nameof(Name)
            );
            content.Add(
                new StringContent(Description), 
                nameof(Description)
            );

            return content;
        }
    }
}
