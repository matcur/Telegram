using System;
using System.Net;
using System.Windows;

namespace Telegram
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        public const string NamedStyleUri = "pack://application:,,,/Client/Dictionaries/NamedStyles";

        private void OnActivated(object sender, EventArgs e)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
        }
    }
}
