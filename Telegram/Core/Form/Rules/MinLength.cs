using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Core.Form;

namespace Telegram.Core.Form.Rules
{
    class MinLength : IRule
    {
        private readonly string displayName;

        private readonly int min;

        public MinLength(string displayName, int min)
        {
            this.displayName = displayName;
            this.min = min;
        }

        public ValidationResult Validate(string value)
        {
            if (value.Length < min)
            {
                return new ValidationResult(false, $"{displayName} can not be less than {min}.");
            }

            return new ValidationResult(true);
        }
    }
}
