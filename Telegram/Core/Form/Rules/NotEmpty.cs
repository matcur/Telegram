using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Core.Form;

namespace Telegram.Core.Form.Rules
{
    class NotEmpty : IRule
    {
        public ValidationResult Validate(string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                return new ValidationResult(false, $"Can not be empty.");
            }

            return new ValidationResult(true);
        }
    }
}
