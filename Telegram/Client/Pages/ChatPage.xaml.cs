using System;
using System.Collections.Generic;
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
using Telegram.Core.Models;

namespace Telegram.Client.Pages
{
    /// <summary>
    /// Interaction logic for Chat.xaml
    /// </summary>
    public partial class ChatPage : Page
    {
        private readonly Chat chat;

        public Chat Chat => chat;
        
        public ChatPage(Chat chat)
        {
            this.chat = chat;
            DataContext = this;
            InitializeComponent();
        }
    }
}
