namespace Telegram.Core.Form.Inputs
{
    interface IInput
    {
        string Value { get; }

        ValidationResult Validate(string value);
    }
}