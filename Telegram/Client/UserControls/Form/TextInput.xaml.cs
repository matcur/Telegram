using System.ComponentModel;
using System.Windows;
using System.Windows.Controls;

namespace Telegram.Client.UserControls.Form
{
    public partial class TextInput : UserControl
    {
        public static readonly DependencyProperty TitleProperty = DependencyProperty.Register(
            nameof(Title),
            typeof(string),
            typeof(TextInput)
        );

        public string Title
        {
            get { return (string) GetValue(TitleProperty); }
            set { SetValue(TitleProperty, value); }
        }

        public string Value { get; set; }

        public TextInput() : this("")
        {
            
        }
        
        public TextInput(string title)
        {
            DataContext = this;
            Title = title;
            InitializeComponent();
        }
    }
}