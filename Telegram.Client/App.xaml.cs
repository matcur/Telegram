using System;
using System.Net;
using System.Windows;
using System.Windows.Navigation;
using Telegram.Client.Ui.Windows;

namespace Telegram.Client
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private void OnLoadCompleted(object sender, NavigationEventArgs e)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
        }
    }
}
