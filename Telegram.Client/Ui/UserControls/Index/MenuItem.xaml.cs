using System;
using System.Windows;
using System.Windows.Controls;

namespace Telegram.Client.Ui.UserControls.Index
{
    /// <summary>
    /// Interaction logic for MenuItem.xaml
    /// </summary>
    public partial class MenuItem : UserControl
    {
        public UserControl Icon { get; }
        
        public UserControl AdditionalAction { get; }

        public Action ClickAction { get; }

        public string Title { get; }

        public MenuItem(string title, UserControl icon) :
            this(title, icon, new UserControl(), () => { })
        {
        }

        public MenuItem(string title, UserControl icon, Action clickAction) :
            this(title, icon, new UserControl(), clickAction)
        {

        }

        public MenuItem(string title, UserControl icon, UserControl additionalAction, Action clickAction)
        {
            Title = title;
            Icon = icon;
            AdditionalAction = additionalAction;
            ClickAction = clickAction;
            DataContext = this;
            InitializeComponent();
        }

        private void OnClick(object sender, RoutedEventArgs e)
        {
            ClickAction();
        }
    }
}
