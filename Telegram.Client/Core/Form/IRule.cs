namespace Telegram.Client.Core.Form
{
    interface IRule
    {
        ValidationResult Validate(string value);
    }
}
