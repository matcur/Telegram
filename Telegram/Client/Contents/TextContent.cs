using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace Telegram.Client.Contents
{
    public class TextContent : IContent
    {
        public int DisplayOrder => 100;

        public string Description => "Text";

        public string Text { get; }

        public FrameworkElement VisualPresentation
        {
            get
            {
                return new TextBlock
                {
                    Style = Style,
                    Text = Text,
                };
            }
        }

        public Style Style
        {
            get
            {
                return (Style)Application.Current.FindResource("MessageTextStyle");
            }
        }

        public TextContent(string text)
        {
            Text = text;
        }
    }
}
