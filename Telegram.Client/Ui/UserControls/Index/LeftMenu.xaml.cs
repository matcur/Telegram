using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using Telegram.Client.Api.Fake.Resources;
using Telegram.Client.Core.Models;
using Telegram.Client.Ui.UserControls.Forms;
using Telegram.Client.Ui.UserControls.Icons;

namespace Telegram.Client.Ui.UserControls.Index
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
                    new MenuItem(
                        "New Group",
                        new Loupe(),
                        () => upLayer.CenterElement = new NewGroupForm(
                            new FakeChats()
                        )
                    ),
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
            var item = (MenuItem)Options.SelectedItem;
            item.Click();
            ItemSelected();
        }
    }
}
