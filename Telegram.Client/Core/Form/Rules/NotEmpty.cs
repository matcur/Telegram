namespace Telegram.Client.Core.Form.Rules
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
