using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Media;

namespace Telegram.Client.Colors
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
