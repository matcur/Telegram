using System.IO;
using System.Windows;
using System.Windows.Controls;
using Telegram.Client.Api.Auth;
using Telegram.Client.Api.Resources;
using Telegram.Client.Core.Form;
using Telegram.Client.Core.Form.Inputs;
using Telegram.Client.Core.Form.Rules;
using Telegram.Client.Core.Models;
using Image = System.Drawing.Image;

namespace Telegram.Client.Ui.UserControls.Forms
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
                    ImageInput,
                    new NotEmpty()
                ),
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

            chats.Add(
                NameInput.Value,
                DescriptionInput.Value,
                File.Open(ImageInput.Value, FileMode.Open)
            );
        }
    }
}