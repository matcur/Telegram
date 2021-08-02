using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Forms.VisualStyles;
using System.Windows.Input;
using Telegram.Client.Core.Models;
using Telegram.Client.Ui.Contents;

namespace Telegram.Client.Ui.UserControls.Notification
{
    // TODO add opacity
    public partial class NotificationItem : UserControl
    {
        public event Action<NotificationItem> CloseClicked = delegate {  };
        
        public UIElement Content { get; }

        public NotificationItem(UIElement content)
        {
            Content = content;
            
            InitializeComponent();

            Panel.Children.Add(content);
        }

        private void OnMouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            CloseClicked.Invoke(this);
        }

        private async void OnLoaded(object sender, RoutedEventArgs e)
        {
            await Task.Delay(1000);
            CloseClicked.Invoke(this);
        }
    }
}