using System;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using Telegram.Client.Core.Models;
using Telegram.Client.Ui.Colors;

namespace Telegram.Client.Ui.UserControls.ChatPage
{
    public partial class MessageItem : UserControl
    {
        public event Action<Message> Editing = delegate { };
        
        public Message Message { get; }

        public SolidColorBrush AuthorForeground =>
            new SolidColorBrush(
                new ColorFromText(
                    Message.Author.FullName
                ).Value
            );

        public MessageItem(Message message)
        {
            Message = message;
            DataContext = this;
            InitializeComponent();
        }

        private void OnDoubleClick(object sender, MouseButtonEventArgs e)
        {
            Editing.Invoke(Message);
        }
    }
}