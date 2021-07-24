using System;
using System.Globalization;
using System.Windows.Data;

namespace Telegram.Ui.Converters
{
    public class ElementInitialization : IValueConverter
    {
        private readonly Func<object> initialization;

        public ElementInitialization(Func<object> initialization)
        {
            this.initialization = initialization;
        }
        
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            return initialization();
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}