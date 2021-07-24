using System.Windows;
using System.Windows.Controls;
using Telegram.Client.Core;

namespace Telegram.Client.Ui.UserControls.Index
{
    /// <summary>
    /// Interaction logic for ChatSearch.xaml
    /// </summary>
    public partial class ChatSearch : UserControl
    {
        public static DependencyProperty TextChangedCommandProperty = DependencyProperty.Register(
            nameof(TextChangedCommand),
            typeof(RelayCommand),
            typeof(ChatSearch)
        );

        public RelayCommand TextChangedCommand
        {
            get => (RelayCommand)GetValue(TextChangedCommandProperty);
            set => SetValue(TextChangedCommandProperty, value);
        }

        public ChatSearch()
        {
            InitializeComponent();
        }

        private void OnTextChanged(object sender, TextChangedEventArgs e)
        {
            var searchText = input.Text;
            if (TextChangedCommand.CanExecute(searchText))
            {
                TextChangedCommand.Execute(searchText);
            }
        }
    }
}
