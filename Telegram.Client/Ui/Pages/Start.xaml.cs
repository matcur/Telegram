using System.Windows;
using System.Windows.Controls;
using Telegram.Client.Api.Fake.Auth;
using Telegram.Client.Api.Fake.Resources;
using Telegram.Client.Core;
using Telegram.Client.Ui.ViewModels;

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
            navigation.To(
                new Login(
                    new LoginViewModel(
                        new FakeUsers(),
                        new FakePhones(),
                        new FakeVerification()
                    )    
                )
            );
        }
    }
}
