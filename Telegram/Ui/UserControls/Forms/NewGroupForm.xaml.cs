using System.Windows.Controls;
using System.Windows;
using Telegram.Core.Form;
using Telegram.Core.Form.Inputs;
using Telegram.Core.Form.Rules;
using Telegram.Api.Resources;
using Telegram.Core.Models;

namespace Telegram.Client.UserControls.Forms
{
    public partial class NewGroupForm : UserControl
    {
        private readonly GroupForm form;

        private readonly IChatsResource chats;

        public NewGroupForm(IChatsResource chats)
        {
            this.chats = chats;
            InitializeComponent();
            form = new GroupForm(
                new Input(
                    NameInput,
                    new NotEmpty()
                ),
                new Input(
                    DescriptionInput,
                    new NotEmpty()
                )
            );
        }

        private void TryCreate(object sender, RoutedEventArgs e)
        {
            if (!form.IsValid())
            {
                return;
            }

            chats.Add(new Chat 
            { 
                Name = NameInput.Value,
                Description = DescriptionInput.Value, 
            });
        }
    }
}