using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Core.Models;

namespace Telegram.Client.Contents
{
    public class VisualContentFactory
    {
        private Dictionary<ContentTypeName, Func<Content, IContent>> contents
            = new Dictionary<ContentTypeName, Func<Content, IContent>>
            {
                { ContentTypeName.Text, content => new TextContent(content.Value) }, 
                { ContentTypeName.Image, content => new ImageContent(content.Value) }, 
            };

        public IContent From(Content content)
        {
            var type = content.Type.Name;
            if (!contents.ContainsKey(type))
            {
                throw new Exception($"Can't create content from {type}");
            }

            return contents[type].Invoke(content);
        }
    }
}
