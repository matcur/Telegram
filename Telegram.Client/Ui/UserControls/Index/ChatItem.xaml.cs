using System.Collections.Generic;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using Telegram.Client.Core.Collections;
using Telegram.Client.Core.Models;
using Telegram.Client.Ui.Contents;

namespace Telegram.Client.Ui.UserControls.Index
{
    public partial class ChatItem : UserControl
    {
        public static readonly DependencyProperty ChatNameProperty = DependencyProperty.Register(
            nameof(ChatName),
            typeof(string),
            typeof(ChatItem)
        );

        public static readonly DependencyProperty LastMessageProperty = DependencyProperty.Register(
            nameof(LastMessage),
            typeof(Message),
            typeof(ChatItem)
        );

        public static readonly DependencyProperty IconUrlProperty = DependencyProperty.Register(
            nameof(IconUrl),
            typeof(string),
            typeof(ChatItem)
        );

        public static readonly DependencyProperty UnreadMessagesProperty = DependencyProperty.Register(
            nameof(UnreadMessages),
            typeof(ILiveCollection<Message>),
            typeof(ChatItem)
        );

        public ILiveCollection<Message> UnreadMessages
        {
            get => (ILiveCollection<Message>) GetValue(UnreadMessagesProperty);
            set => SetValue(UnreadMessagesProperty, value);
        }

        public string ChatName
        {
            get => (string) GetValue(ChatNameProperty);
            set => SetValue(ChatNameProperty, value);
        }

        public Message LastMessage
        {
            get => (Message) GetValue(LastMessageProperty);
            set => SetValue(LastMessageProperty, value);
        }

        public string IconUrl
        {
            get => (string) GetValue(IconUrlProperty);
            set => SetValue(IconUrlProperty, value);
        }
        
        public ChatItem()
        {
            InitializeComponent();
        }
    }
}