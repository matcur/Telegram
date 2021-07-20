using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Telegram.Core.Form;

namespace Telegram.Core.Form.Rules
{
    class Email : IRule
    {
        public ValidationResult Validate(string value)
        {
            var email = new EmailAddressAttribute();
            if (email.IsValid(value))
            {
                return new ValidationResult(true);
            }

            return new ValidationResult(false, $"{value} is not valid email.");
        }
    }
}
