namespace Telegram.Client.Core.Form.Rules
{
    class MinLength : IRule
    {
        private readonly string _displayName;

        private readonly int _min;

        public MinLength(string displayName, int min)
        {
            _displayName = displayName;
            _min = min;
        }

        public ValidationResult Validate(string value)
        {
            if (value.Length < _min)
            {
                return new ValidationResult(false, $"{_displayName} can not be less than {_min}.");
            }

            return new ValidationResult(true);
        }
    }
}
