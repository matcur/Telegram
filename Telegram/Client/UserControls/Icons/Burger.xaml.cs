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
using Telegram.Core;

namespace Telegram.Client.UserControls.Icons
{
    /// <summary>
    /// Interaction logic for Burger.xaml
    /// </summary>
    public partial class Burger : UserControl
    {
        public static DependencyProperty ClickCommandProperty = DependencyProperty.Register(
            nameof(ClickCommand),
            typeof(RelayCommand),
            typeof(Burger)
        );

        public RelayCommand ClickCommand
        {
            get => (RelayCommand)GetValue(ClickCommandProperty);
            set => SetValue(ClickCommandProperty, value);
        }

        public Burger()
        {
            InitializeComponent();
        }

        private void OnClick(object sender, RoutedEventArgs e)
        {
            ClickCommand.Execute(sender);
        }
    }
}