using System.Windows;
using System.Windows.Controls;
using Telegram.Core;

namespace Telegram.Ui.UserControls.Icons
{
    /// <summary>
    /// Interaction logic for Burger.xaml
    /// </summary>
    public partial class Burger : UserControl
    {
        public static DependencyProperty ClickCommandProperty = DependencyProperty.Register(
            nameof(ClickCommand),
            typeof(RelayCommand),
            typeof(Burger)
        );

        public RelayCommand ClickCommand
        {
            get => (RelayCommand)GetValue(ClickCommandProperty);
            set => SetValue(ClickCommandProperty, value);
        }

        public Burger()
        {
            InitializeComponent();
        }

        private void OnClick(object sender, RoutedEventArgs e)
        {
            ClickCommand.Execute(sender);
        }
    }
}
