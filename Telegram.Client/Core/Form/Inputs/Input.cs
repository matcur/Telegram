using System;
using System.Collections.Generic;
using Telegram.Client.Ui.UserControls.Form;

namespace Telegram.Client.Core.Form.Inputs
{
    class Input : IInput
    {
        public string Value => value;

        private string value;

        private readonly IEnumerable<IRule> rules;

        private readonly Action<string> setErrorAction;

        public Input(IVisualInput input, params IRule[] rules)
        {
            value = input.Value;
            this.rules = rules;
            setErrorAction = v => input.Error = v;
            input.ValueChanged += OnValueChanged;
        }

        public void OnValueChanged(string value)
        {
            this.value = value;
            setErrorAction(Validate(value).Error);
        }

        public ValidationResult Validate(string value)
        {
            foreach (var rule in rules)
            {
                var result = rule.Validate(value);
                if (!result.Success)
                {
                    return result;
                }
            }

            return new ValidationResult(true);
        }
    }
}
