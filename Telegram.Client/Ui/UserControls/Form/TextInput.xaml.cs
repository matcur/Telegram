using System;
using System.Windows;
using System.Windows.Controls;

namespace Telegram.Ui.UserControls.Form
{
    public partial class TextInput : UserControl, IVisualInput
    {
        public static readonly DependencyProperty TitleProperty = DependencyProperty.Register(
            nameof(Title),
            typeof(string),
            typeof(TextInput)
        );

        public static readonly DependencyProperty ErrorProperty = DependencyProperty.Register(
            nameof(Error),
            typeof(string),
            typeof(TextInput)
        );

        public event Action<string> ValueChanged = delegate { };

        public string Title
        {
            get => (string)GetValue(TitleProperty);
            set => SetValue(TitleProperty, value);
        }

        public string Error
        {
            get => (string)GetValue(ErrorProperty);
            set => SetValue(ErrorProperty, value);
        }

        public Visibility ErrorVisibility
        {
            get
            {
                if (Error.Length == 0)
                {
                    return Visibility.Visible;
                }

                return Visibility.Hidden;
            }
        }

        public string Value { get; set; }

        public TextInput() : this("", "")
        {

        }

        public TextInput(string title, string error)
        {
            Title = title;
            Error = error;
            DataContext = this;
            InitializeComponent();
        }

        private void OnValueChange(object sender, TextChangedEventArgs e)
        {
            var box = (TextBox)sender;
            Value = box.Text;
            ValueChanged(Value);
        }
    }
}