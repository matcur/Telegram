using Telegram.Client.Core.Form.Inputs;

namespace Telegram.Client.Core.Form
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
