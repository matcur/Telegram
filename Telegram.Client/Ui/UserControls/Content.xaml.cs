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
using Telegram.Client.Contents;
using Telegram.Core.Models;

namespace Telegram.Client.UserControls
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
