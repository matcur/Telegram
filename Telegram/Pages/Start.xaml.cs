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

namespace Telegram.Pages
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
