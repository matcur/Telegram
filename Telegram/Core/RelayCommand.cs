using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Telegram.Core
{
    public class RelayCommand : ICommand
    {
        public event EventHandler CanExecuteChanged = delegate { };

        private readonly Action<object> execute;

        private readonly Func<bool> canExecute;

        public RelayCommand(Action<object> execute, Func<bool> canExecute = null)
        {
            this.execute = execute;
            this.canExecute = canExecute;
        }

        public bool CanExecute(object parameter)
        {
            return canExecute == null || canExecute();
        }

        public void Execute(object parameter)
        {
            execute(parameter);
        }
    }
}
