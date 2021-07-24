using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using Telegram.Core.Models;
using Telegram.Ui.Contents;

namespace Telegram.Ui.UserControls
{
    /// <summary>
    /// Interaction logic for Content.xaml
    /// </summary>
    public partial class ContentControl : UserControl
    {
        public static DependencyProperty ValueProperty = DependencyProperty.Register(
            nameof(Value),
            typeof(IEnumerable<Content>),
            typeof(ContentControl)
        );

        public IEnumerable<Content> Value
        {
            get => (IEnumerable<Content>)GetValue(ValueProperty);
            set => SetValue(ValueProperty, value);
        }

        public ContentControl()
        {
            InitializeComponent();
        }

        private void OnLoaded(object sender, RoutedEventArgs e)
        {
            presentations?.Children.Add(new ComplexContent(Value).VisualPresentation);
        }
    }
}
