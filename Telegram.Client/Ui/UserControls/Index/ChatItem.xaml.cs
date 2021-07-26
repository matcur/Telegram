﻿using System.Windows;
using System.Windows.Controls;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Ui.UserControls.Index
{
    /// <summary>
    /// Interaction logic for ChatItem.xaml
    /// </summary>
    public partial class ChatItem : UserControl
    {
        public static readonly DependencyProperty ChatProperty = DependencyProperty.Register(
            nameof(Chat),
            typeof(Chat),
            typeof(ChatItem)
        );

        public Chat Chat { get; set; }

        public ChatItem()
        {
            InitializeComponent();
        }
    }
}