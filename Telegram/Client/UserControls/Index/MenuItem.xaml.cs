﻿using System;
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
using Telegram.Client.UserControls.Icons;
using Telegram.Core;

namespace Telegram.Client.UserControls.Index
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
