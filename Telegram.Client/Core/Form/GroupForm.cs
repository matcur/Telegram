using Telegram.Client.Core.Form.Inputs;

namespace Telegram.Client.Core.Form
{
    class GroupForm
    {
        private readonly IInput[] _inputs;

        public GroupForm(params IInput[] inputs)
        {
            _inputs = inputs;
        }

        public bool IsValid()
        {
            foreach (var input in _inputs)
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
