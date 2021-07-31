using System.Collections;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Input;
using Telegram.Client.Core.Extensions;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Ui.UserControls.ChatPage
{
    /// <summary>
    /// Interaction logic for Body.xaml
    /// </summary>
    public partial class Body : UserControl
    {
        public static readonly DependencyProperty MessagesProperty = DependencyProperty.Register(
            nameof(Messages),
            typeof(ObservableCollection<Message>),
            typeof(Body)
        );

        public ObservableCollection<Message> Messages
        {
            get => (ObservableCollection<Message>)GetValue(MessagesProperty);
            set => SetValue(MessagesProperty, value);
        }

        private bool loaded = false;

        public Body()
        {
            InitializeComponent();
        }
        
        private void OnLoaded(object sender, RoutedEventArgs e)
        {
            if (loaded)
            {
                return;
            }

            loaded = true;
            
            Messages.CollectionChanged += OnMessagesChange;
            AddMessages(Messages);
            MessageScroll.ScrollToBottom();
        }

        private void OnScroll(object sender, ScrollEventArgs e)
        {
            var verticalOffset = e.NewValue;
            MessageScroll.ScrollToVerticalOffset(verticalOffset);
        }

        private void OnMouseWheel(object sender, MouseWheelEventArgs e)
        {
            var offset = MessageScroll.VerticalOffset;
            var indent = 20;
            if (e.Delta > 0)
            {
                MessageScroll.ScrollToVerticalOffset(offset - indent);
            }
            else
            {
                MessageScroll.ScrollToVerticalOffset(offset + indent);
            }
        }

        private void OnMessagesChange(object sender, NotifyCollectionChangedEventArgs e)
        {
            var items = e.NewItems;
            if (items.Count != 0)
            {
                AddMessages(items);
            }
        }

        private void AddMessages(IEnumerable messages)
        {
            foreach (var message in messages)
            {
                AddMessage((Message)message);
            }
        }

        private void AddMessage(Message message)
        {
            var lastItem = LastMessageItem();
            var item = new MessageItem(message, lastItem.Message, Message.Empty);
            lastItem.Next = message;
            
            MessageList.Items.Add(item);
        }

        private Message LastMessage()
        {
            var items = MessageList.Items;
            if (items.Count == 0)
            {
                return Message.Empty;
            }

            return LastMessageItem().Message;
        }

        private MessageItem LastMessageItem()
        {
            var items = MessageList.Items;
            if (items.Count == 0)
            {
                return MessageItem.Empty;
            }

            return (MessageItem)items.Last();
        }
    }
}
