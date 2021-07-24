using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;

namespace Telegram.Client.Core
{
    public class Navigation
    {
        private readonly NavigationService service;

        public Navigation(DependencyObject @object)
        {
            service = NavigationService.GetNavigationService(@object);
        }

        public void To(Page page)
        {
            service.Navigate(page);
        }
    }
}
