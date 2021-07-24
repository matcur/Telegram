using System.Windows;
using System.Windows.Input;

namespace Telegram.Client
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void OnDragMove(object sender, MouseButtonEventArgs e)
        {
            DragMove();
        }

        private void Close(object sender, RoutedEventArgs e)
        {
            Close();
        }

        private void ToggleWindowState(object sender, RoutedEventArgs e)
        {
            if (WindowState == WindowState.Maximized)
                Normalize();
            else
                Maximize();
        }

        private void Minimize(object sender = null, RoutedEventArgs e = null)
        {
            WindowState = WindowState.Minimized;
        }

        private void Maximize(object sender = null, RoutedEventArgs e = null)
        {
            WindowState = WindowState.Maximized;
        }

        private void Normalize(object sender = null, RoutedEventArgs e = null)
        {
            WindowState = WindowState.Normal;
        }
    }
}
