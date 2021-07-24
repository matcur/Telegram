using System.ComponentModel.DataAnnotations;

namespace Telegram.Client.Core.Form.Rules
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
