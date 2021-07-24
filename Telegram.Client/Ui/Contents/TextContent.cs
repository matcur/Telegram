using System.Windows;
using System.Windows.Controls;

namespace Telegram.Client.Ui.Contents
{
    public class TextContent : IContent
    {
        public int DisplayOrder => 100;

        public string Description => "Text";

        public FrameworkElement VisualPresentation =>
            new TextBlock
            {
                Style = style,
                Text = text,
            };

        private readonly Style style = (Style)Application.Current.FindResource("MessageTextStyle");

        private readonly string text;

        public TextContent(string text)
        {
            this.text = text;
        }
    }
}
