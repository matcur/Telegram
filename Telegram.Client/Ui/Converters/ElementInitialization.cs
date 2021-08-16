using System;
using System.Globalization;
using System.Windows.Data;

namespace Telegram.Client.Ui.Converters
{
    public class ElementInitialization : IValueConverter
    {
        private readonly Func<object> _initialization;

        public ElementInitialization(Func<object> initialization)
        {
            _initialization = initialization;
        }
        
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            return _initialization();
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}