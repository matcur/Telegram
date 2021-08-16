using System;
using System.Collections;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Input;
using Telegram.Client.Core.Collections;
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
            typeof(ILiveCollection<Message>),
            typeof(Body)
        );
        
        public event Action ScrolledToTop = delegate {  };

        public ILiveCollection<Message> Messages
        {
            get => (ILiveCollection<Message>)GetValue(MessagesProperty);
            set => SetValue(MessagesProperty, value);
        }
        
        private bool _loaded = false;

        public Body()
        {
            InitializeComponent();
        }
        
        private void OnLoaded(object sender, RoutedEventArgs e)
        {
            if (_loaded)
            {
                return;
            }

            _loaded = true;
            
            Messages.CollectionChanged += OnMessagesChange;
            Insert(0, Messages);
            MessageScroll.ScrollToBottom();
        }

        private void OnScroll(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            var offset = e.NewValue;
            MessageScroll.ScrollToVerticalOffset(offset);

            if (offset < 20 && offset != 0)
            {
                ScrolledToTop.Invoke();
            }
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
            var startIndex = e.NewStartingIndex;
            if (items.Count != 0)
            {
                Insert(startIndex, items);
            }
        }

        private void Insert(int index, IEnumerable messages)
        {
            foreach (var message in messages)
            {
                Insert(index++, (Message)message);
            }
        }

        private void Insert(int index, Message message)
        {
            var lastItem = LastMessageItem();
            var item = new MessageItem(message, lastItem.Message, Message.Empty);
            lastItem.Next = message;
            
            MessageList.Items.Insert(index, item);
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
