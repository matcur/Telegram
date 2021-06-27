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
using System.Windows.Shell;

namespace Telegram
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

        private void ToggleState(object sender, RoutedEventArgs e)
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
