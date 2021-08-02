using System;
using System.Collections.Generic;
using System.Windows.Controls;
using Telegram.Client.Core.Models;
using Telegram.Client.Ui.Contents;

namespace Telegram.Client.Ui.UserControls.Notification
{
    public partial class MessageNotification : UserControl
    {
        public Message Message { get; }
        
        public Chat Chat { get; }
        
        public VisualContentFactory ContentFactory =>
            new VisualContentFactory(
                new Dictionary<ContentType, Func<Content, IContent>>
                {
                    {ContentType.Text, content => new TextContent(content.Value)},
                    {ContentType.Image, content => new TextContent("Photo")},
                }
            );

        public MessageNotification(Message message, Chat chat)
        {
            Message = message;
            Chat = chat;
            DataContext = this;
            InitializeComponent();
        }
    }
}