using System.Windows;
using System.Windows.Controls;
using Telegram.Client.Core;

namespace Telegram.Client.Ui.Pages
{
    /// <summary>
    /// Interaction logic for Start.xaml
    /// </summary>
    public partial class Start : Page
    {
        private  Navigation navigation;

        public Start()
        {
            InitializeComponent();
            Loaded += delegate { navigation = new Navigation(this); };
        }

        private void GoToLogin(object sender, RoutedEventArgs e)
        {
            navigation.To(new Login());
        }
    }
}
