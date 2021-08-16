using System;
using System.Collections.Generic;
using Telegram.Client.Ui.UserControls.Form;

namespace Telegram.Client.Core.Form.Inputs
{
    class Input : IInput
    {
        public string Value => _value;

        private string _value;

        private readonly IEnumerable<IRule> _rules;

        private readonly Action<string> _setErrorAction;

        public Input(IVisualInput input, params IRule[] rules)
        {
            _value = input.Value;
            _rules = rules;
            _setErrorAction = v => input.Error = v;
            input.ValueChanged += OnValueChanged;
        }

        public void OnValueChanged(string value)
        {
            _value = value;
            _setErrorAction(Validate(value).Error);
        }

        public ValidationResult Validate(string value)
        {
            foreach (var rule in _rules)
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
