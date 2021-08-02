using System;
using System.Windows;
using System.Windows.Controls;
using Telegram.Client.Ui.UserControls.Notification;

namespace Telegram.Client.Ui.Windows
{
    public partial class NotificationsWindow : Window
    {
        public event Action<NotificationItem> ItemAdded = delegate {  };

        private readonly UIElementCollection notifications;
        
        public NotificationsWindow()
        {
            Height = SystemParameters.PrimaryScreenHeight;
            InitializeComponent();
            MoveToRightBottom();
            notifications = NotificationList.Children;
        }

        public void AddNotification(UIElement content)
        {
            AddNotification(new NotificationItem(content));
        }

        public void AddNotification(NotificationItem notification)
        {
            notifications.Add(notification);
            notification.CloseClicked += RemoveNotification;
            ItemAdded.Invoke(notification);
        }

        private void RemoveNotification(NotificationItem notification)
        {
            notifications.Remove(notification);
        }

        private void MoveToRightBottom()
        {
            Top = SystemParameters.PrimaryScreenHeight - Height - 50;
            Left = SystemParameters.PrimaryScreenWidth - Width - 10;
        }
    }
}