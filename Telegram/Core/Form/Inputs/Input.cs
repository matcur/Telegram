using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Client.UserControls.Form;
using Telegram.Core.Form;

namespace Telegram.Core.Form.Inputs
{
    class Input : IInput
    {
        public string Value => value;

        private string value;

        private readonly IEnumerable<IRule> rules;

        private readonly Action<string> setErrorAction;

        public Input(TextInput input, params IRule[] rules)
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
