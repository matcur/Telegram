using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Telegram.Models;

namespace Telegram.UserControls.Index
{
    /// <summary>
    /// Interaction logic for ChatItem.xaml
    /// </summary>
    public partial class ChatItem : UserControl
    {
        public static readonly DependencyProperty ChatProperty = DependencyProperty.Register(
            "Chat",
            typeof(Chat),
            typeof(ChatItem)
        );

        public Chat Chat 
        { 
            get; 
            set; 
        }

        public ChatItem()
        {
            InitializeComponent();
        }
    }
}
