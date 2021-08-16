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
        private readonly GroupForm _form;

        private readonly IChatsResource _chats;
        
        public NewGroupForm(IChatsResource chats)
        {
            _chats = chats;
            InitializeComponent();
            _form = new GroupForm(
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
            if (!_form.IsValid())
            {
                return;
            }

            _chats.Add(
                NameInput.Value,
                DescriptionInput.Value,
                File.Open(ImageInput.Value, FileMode.Open)
            );
        }
    }
}