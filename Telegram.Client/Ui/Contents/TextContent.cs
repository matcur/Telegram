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
                Style = _style,
                Text = _text,
            };

        private readonly Style _style = (Style)Application.Current.FindResource("MessageTextStyle");

        private readonly string _text;

        public TextContent(string text)
        {
            _text = text;
        }
    }
}
