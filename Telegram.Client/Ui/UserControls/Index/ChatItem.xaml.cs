using System.Windows;
using System.Windows.Controls;
using Telegram.Core.Models;

namespace Telegram.Ui.UserControls.Index
{
    /// <summary>
    /// Interaction logic for ChatItem.xaml
    /// </summary>
    public partial class ChatItem : UserControl
    {
        public static readonly DependencyProperty ChatProperty = DependencyProperty.Register(
            nameof(Chat),
            typeof(Chat),
            typeof(ChatItem)
        );

        public Chat Chat { get; set; }

        public ChatItem()
        {
            InitializeComponent();
        }
    }
}
