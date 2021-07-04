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
using Telegram.Client.Content;

namespace Telegram.Client.UserControls
{
    /// <summary>
    /// Interaction logic for Content.xaml
    /// </summary>
    public partial class Content : UserControl
    {
        public static DependencyProperty ValueProperty = DependencyProperty.Register(
            nameof(Value),
            typeof(IContent),
            typeof(Content)
        );

        public IContent Value
        {
            get => (IContent)GetValue(ValueProperty);
            set => SetValue(ValueProperty, value);
        }

        public Content()
        {
            InitializeComponent();
        }

        private void OnLoaded(object sender, RoutedEventArgs e)
        {
            presentations.Children.Add(Value.VizualPresentation);
        }
    }
}
