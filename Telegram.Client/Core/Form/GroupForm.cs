using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Core.Form.Inputs;

namespace Telegram.Core.Form
{
    class GroupForm
    {
        private readonly IInput[] inputs;

        public GroupForm(params IInput[] inputs)
        {
            this.inputs = inputs;
        }

        public bool IsValid()
        {
            foreach (var input in inputs)
            {
                var result = input.Validate(input.Value);
                if (!result.Success)
                {
                    return false;
                }
            }

            return true;
        }
    }
}
