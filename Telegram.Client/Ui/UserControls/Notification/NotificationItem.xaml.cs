using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Forms.VisualStyles;
using System.Windows.Input;
using System.Windows.Media.Animation;
using Telegram.Client.Core;
using Telegram.Client.Core.Models;
using Telegram.Client.Ui.Contents;

namespace Telegram.Client.Ui.UserControls.Notification
{
    public partial class NotificationItem : UserControl
    {
        public UIElement ItemContent { get; }
        
        public NotificationItem(UIElement itemContent)
        {
            ItemContent = itemContent;
            
            InitializeComponent();

            Margin = new Thickness(5 * Width, 10, 0, 0);;
            Panel.Children.Add(itemContent);
        }

        private async void OnLoaded(object sender, RoutedEventArgs e)
        {
            await BeginClosing();
        }

        private async Task BeginClosing()
        {
            await Task.Delay(15000);
        }
    }
}