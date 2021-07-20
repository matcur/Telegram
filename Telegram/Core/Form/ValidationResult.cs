using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telegram.Core.Form
{
    class ValidationResult
    {
        public bool Success { get; }

        public string Error { get; }

        public ValidationResult(bool success) : this(success, "")
        {

        }

        public ValidationResult(bool success, string error)
        {
            Success = success;
            Error = error;
        }
    }
}
