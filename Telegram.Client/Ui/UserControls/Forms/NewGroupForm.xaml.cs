using System.Windows;
using System.Windows.Controls;
using Telegram.Api.Resources;
using Telegram.Core.Form;
using Telegram.Core.Form.Inputs;
using Telegram.Core.Form.Rules;
using Telegram.Core.Models;
using Image = System.Drawing.Image;

namespace Telegram.Ui.UserControls.Forms
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