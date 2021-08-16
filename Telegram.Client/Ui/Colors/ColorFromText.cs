using System;
using System.Windows.Media;

namespace Telegram.Client.Ui.Colors
{
    public class ColorFromText : IColor
    {
        private readonly string _text;

        public ColorFromText(string text)
        {
            _text = text;
        }

        public Color Value
        {
            get
            {
                var bytes = BitConverter.GetBytes(_text.GetHashCode());

                return Color.FromRgb(
                    bytes[0],
                    bytes[1],
                    bytes[2]
                );
            }
        }
    }
}
