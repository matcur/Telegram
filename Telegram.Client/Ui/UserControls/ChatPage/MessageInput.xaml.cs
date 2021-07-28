using System;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Telegram.Client.Core;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Ui.UserControls.ChatPage
{
    public partial class MessageInput : UserControl, INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged = delegate {  };

        public event Action<Message> Submitting = delegate {  };

        public string Text
        {
            get => text;
            set
            {
                text = value;
                OnPropertyChanged(nameof(Text));
            }
        }

        public Message Message { get; set; }

        private string text;
        
        public MessageInput()
        {
            DataContext = this;
            InitializeComponent();
        }

        private void Send(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Enter)
            {
                Submit();
                ClearData();
            }
        }

        private void Submit()
        {
            Message.Content.Add(new Content {Value = Text, Type = ContentType.Text});
            Submitting(Message.Clone());
        }

        private void ClearData()
        {
            Message.Content.Clear();
            Text = "";
        }

        private void OnPropertyChanged(string propertyName = null)
        {
            PropertyChanged.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}