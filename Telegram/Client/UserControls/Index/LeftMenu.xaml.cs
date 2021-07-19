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
using Telegram.Client.UserControls.Form;
using Telegram.Client.UserControls.Forms;
using Telegram.Client.UserControls.Icons;
using Telegram.Core.Models;

namespace Telegram.Client.UserControls.Index
{
    /// <summary>
    /// Interaction logic for LeftMenu.xaml
    /// </summary>
    public partial class LeftMenu : UserControl
    {
        public static readonly DependencyProperty UserProperty = DependencyProperty.Register(
            nameof(User),
            typeof(User),
            typeof(LeftMenu)
        );
        
        public event Action ItemSelected = delegate {  };
        
        public User User
        {
            get => (User)GetValue(UserProperty);
            set => SetValue(UserProperty, value);
        }

        public List<MenuItem> Items
        {
            get
            {
                return new List<MenuItem>
                {
                    new MenuItem("New Group", new Loupe(), () => upLayer.CenterElement = new NewGroupForm()),
                    new MenuItem("New Channel", new Loupe()),
                    new MenuItem("Contacts", new Loupe()),
                    new MenuItem("Calls", new Loupe()),
                    new MenuItem("Settings", new Loupe()),
                    new MenuItem("Night Mode", new Loupe()),
                };
            }
        }

        private readonly UpLayer upLayer;

        public LeftMenu(UpLayer upLayer)
        {
            this.upLayer = upLayer;
            DataContext = this;
            InitializeComponent();
        }

        private void OnItemSelected(object sender, SelectionChangedEventArgs e)
        {
            ItemSelected();
        }
    }
}
