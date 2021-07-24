using System;
using System.Windows.Media;

namespace Telegram.Ui.Colors
{
    public class ColorFromText : IColor
    {
        private readonly string text;

        public ColorFromText(string text)
        {
            this.text = text;
        }

        public Color Value
        {
            get
            {
                var bytes = BitConverter.GetBytes(text.GetHashCode());

                return Color.FromRgb(
                    bytes[0],
                    bytes[1],
                    bytes[2]
                );
            }
        }
    }
}
