using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Telegram.Api.Resources;
using Telegram.Core.Models;
using Telegram.Core.Searching;
using Telegram.Client.ViewModels;
using System.ComponentModel;
using System.IO;

namespace Telegram.Client.Pages
{
    /// <summary>
    /// Interaction logic for Index.xaml
    /// </summary>
    public partial class Index : Page
    {
        private readonly IndexViewModel viewModel;

        public Index()
        {
            var members = new ObservableCollection<User>
            {
                new User { Id = 1, FirstName = "Name", LastName = "Last-Name" },
                new User { Id = 2, FirstName = "Lorem", LastName = "Fuck" },
                new User { Id = 3, FirstName = "Jon", LastName = "Viliam" },
                new User { Id = 4, FirstName = "Json", LastName = "Centurion" },
                new User { Id = 5, FirstName = "Div", LastName = "Lirium" },
            };
            var textType = new ContentType { Name = ContentTypeName.Text };
            var imageType = new ContentType { Name = ContentTypeName.Image };

            var messages1 = new ObservableCollection<Message> 
            { 
                new Message { Content = new List<Content>{ new Content { Value = "Tor", Type = textType } }, Author = members[0] }, 
                new Message { Content = new List<Content>{ new Content { Value = "Message", Type = textType } }, Author = members[1] }
            };
            var messages2 = new ObservableCollection<Message>
            {
                new Message { Content = new List<Content>{ new Content { Value = "Odin", Type = textType } }, Author = members[3] },
                new Message 
                { 
                    Content = new List<Content>
                    { 
                        new Content
                        {
                            Value = "https://www.irishtimes.com/polopoly_fs/1.4191365.1583230595!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg", Type = imageType
                        },
                        new Content
                        {
                            Value = "Fuck Youыуафауыфафыуафыуафыуауфыаыфуаыфуафыуауфыафыа", Type = textType,
                        },
                    }, Author = members[4] 
                }
            };

            var chats = new List<Chat>
            {
                new Chat { Description = "Fruits", Name = "Fruits", Messages = messages1, Members = members },
                new Chat { Description = "Fuck - 1", Name = "Cars", Messages = messages2, Members = members },
                new Chat { Description = "Fuck - 2", Name = "Limb", Messages = messages1, Members = members },
            };
            viewModel = new IndexViewModel(new ChatSearch(chats));
            viewModel.PropertyChanged += OnChatSelected;
            DataContext = viewModel;
            InitializeComponent();
        }

        private void OnChatSelected(object sender, PropertyChangedEventArgs e)
        {
            if (e.PropertyName == nameof(viewModel.SelectedChat))
            {
                frame.Navigate(new ChatPage(viewModel.SelectedChat));
            }
        }
    }
}