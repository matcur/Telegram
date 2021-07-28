using System;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using Telegram.Client.Core.Models;
using Telegram.Client.Ui.Colors;
using Color = System.Drawing.Color;

namespace Telegram.Client.Ui.UserControls.ChatPage
{
    public partial class MessageItem : UserControl, INotifyPropertyChanged
    {
        public static readonly MessageItem Empty = new MessageItem(Message.Empty, Message.Empty, Message.Empty);

        public event PropertyChangedEventHandler PropertyChanged = delegate {  };

        public event Action<Message> Editing = delegate { };
        
        public Message Message { get; }
        public Message Previous { get; }

        public Message Next
        {
            get => next;
            set
            {
                next = value;
                OnPropertyChanged(nameof(NeedDetails));
            }
        }

        public SolidColorBrush AuthorForeground =>
            new SolidColorBrush(
                new MoreLightColor(
                    new ColorFromText(
                        Message.Author.FullName
                    ), 1.2f
                ).Value
            );

        public bool NeedDetails
        {
            get
            {
                // Todo
                var author = Message.Author;
                var previousAuthor = Previous.Author;
                var nextAuthor = Next.Author;
                var nobody = User.Nobody;

                if (nextAuthor == nobody)
                {
                    return true;
                }

                return (author.Id == previousAuthor.Id || previousAuthor == nobody)
                       && (author.Id != nextAuthor.Id); 
            }
        }
        
        private Message next;

        public MessageItem(Message message, Message previous, Message next)
        {
            Message = message;
            Previous = previous;
            Next = next;
            DataContext = this;
            InitializeComponent();
        }

        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        private void OnDoubleClick(object sender, MouseButtonEventArgs e)
        {
            Editing.Invoke(Message);
        }
    }
}