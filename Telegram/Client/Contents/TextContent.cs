using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
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
