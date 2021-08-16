using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;

namespace Telegram.Client.Core
{
    public class Navigation
    {
        private readonly NavigationService _service;

        public Navigation(DependencyObject @object)
        {
            _service = NavigationService.GetNavigationService(@object);
        }

        public void To(Page page)
        {
            _service.Navigate(page);
        }
    }
}
