using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Telegram.Core.Models;

namespace Telegram.Client.UserControls.ChatPage
{
    public partial class MessageItem : UserControl
    {
        public event Action<Message> Editing = delegate { };
        
        public Message Message { get; }
    
        public MessageItem(Message message)
        {
            Message = message;
            InitializeComponent();
            contentControl.Value = Message.Content;
            authorName.Text = Message.Author.FullName;
        }

        private void OnDoubleClick(object sender, MouseButtonEventArgs e)
        {
            Editing.Invoke(Message);
        }
    }
}