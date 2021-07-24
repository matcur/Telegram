using System.Collections;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Windows;
using System.Windows.Controls;
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

        public Body()
        {
            InitializeComponent();
        }
        
        private void OnLoaded(object sender, RoutedEventArgs e)
        {
            Messages.CollectionChanged += OnMessagesChange;
            AddMessages(Messages);
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
            var item = new MessageItem(message);
            messageListView.Items.Add(item);
        }
    }
}
