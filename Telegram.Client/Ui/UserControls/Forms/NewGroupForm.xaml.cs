using System.Windows;
using System.Windows.Controls;
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
        
        private readonly IImagesResource images;

        public NewGroupForm(IChatsResource chats, IImagesResource images)
        {
            this.chats = chats;
            this.images = images;
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

            var path = images.Add(Image.FromFile(ImageInput.Value));
            chats.Add(new Chat
            {
                Name = NameInput.Value,
                Description = DescriptionInput.Value,
                ImagePath = "fuck you",
            });
        }
    }
}