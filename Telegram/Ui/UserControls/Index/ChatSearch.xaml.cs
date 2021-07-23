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
using Telegram.Core;

namespace Telegram.Client.UserControls.Index
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
