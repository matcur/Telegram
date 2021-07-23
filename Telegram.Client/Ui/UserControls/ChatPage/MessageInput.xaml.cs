using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Telegram.Core;
using Telegram.Core.Models;

namespace Telegram.Client.UserControls.ChatPage
{
    public partial class MessageInput : UserControl
    {
        public static readonly DependencyProperty SendCommandProperty = DependencyProperty.Register(
            nameof(SendCommand),
            typeof(RelayCommand),
            typeof(MessageInput)
        );

        public static readonly DependencyProperty MessageProperty = DependencyProperty.Register(
            nameof(Message),
            typeof(Message),
            typeof(MessageInput)
        );

        public Message Message
        {
            get => (Message) GetValue(MessageProperty);
            set => SetValue(MessageProperty, value);
        }

        public RelayCommand SendCommand
        {
            get => (RelayCommand) GetValue(SendCommandProperty);
            set => SetValue(SendCommandProperty, value);
        }
        
        public MessageInput()
        {
            InitializeComponent();
        }

        private void Send(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Enter)
            {
                Message.Content.Add(new Content
                {
                    Type = ContentType.Text,
                    Value = input.Text,
                });
                SendCommand.Execute(Message);
                input.Clear();
            }
        }
    }
}