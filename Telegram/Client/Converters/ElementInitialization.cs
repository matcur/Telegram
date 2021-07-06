using System;
using System.Globalization;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Data;

namespace Telegram.Client.Converters
{
    public class ElementInitialization<T> : IValueConverter
    {
        private readonly Func<T> initialization;

        public ElementInitialization(Func<T> initialization)
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