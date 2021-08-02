using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using Telegram.Client.Core.Models;
using Telegram.Client.Ui.Contents;

namespace Telegram.Client.Ui.UserControls
{
    /// <summary>
    /// Interaction logic for Content.xaml
    /// </summary>
    public partial class ContentControl : UserControl
    {
        public static readonly DependencyProperty ValueProperty = DependencyProperty.Register(
            nameof(Value),
            typeof(IEnumerable<Content>),
            typeof(ContentControl)
        );

        public static readonly DependencyProperty ContentFactoryProperty = DependencyProperty.Register(
            nameof(ContentFactory),
            typeof(VisualContentFactory),
            typeof(ContentControl)
        );

        public IEnumerable<Content> Value
        {
            get => (IEnumerable<Content>) GetValue(ValueProperty);
            set => SetValue(ValueProperty, value);
        }

        public VisualContentFactory ContentFactory
        {
            get => (VisualContentFactory) GetValue(ContentFactoryProperty);
            set => SetValue(ContentFactoryProperty, value);
        }

        private bool loaded = false;

        public ContentControl()
        {
            Value = new List<Content>();
            ContentFactory = new VisualContentFactory();
            InitializeComponent();
        }

        private void OnLoaded(object sender, RoutedEventArgs e)
        {
            if (loaded)
            {
                return;
            }

            loaded = true;

            if (Value != null)
            {
                presentations.Children.Add(
                    new ComplexContent(
                        Value,
                        ContentFactory
                    ).VisualPresentation
                );
            }
        }
    }
}
