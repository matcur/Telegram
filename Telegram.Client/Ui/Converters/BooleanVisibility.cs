using System;
using System.Globalization;
using System.Windows;
using System.Windows.Data;

namespace Telegram.Client.Ui.Converters
{
    public class BooleanVisibility : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value == null)
            {
                return false;
            }

            var invert = (parameter != null) && Boolean.Parse(parameter.ToString());
            if ((Boolean) value ^ invert)
            {
                return Visibility.Visible;
            }

            return Visibility.Hidden;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}