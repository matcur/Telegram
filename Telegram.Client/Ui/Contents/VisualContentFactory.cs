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
        private readonly Dictionary<ContentType, Func<Content, IContent>> contents
            = new Dictionary<ContentType, Func<Content, IContent>>
            {
                { ContentType.Text, content => new TextContent(content.Value) }, 
                { ContentType.Image, content => new ImageContent(content.Value) }, 
            };

        public IContent From(Content content)
        {
            var type = content.Type;
            if (!contents.ContainsKey(type))
            {
                throw new Exception($"Can't create content from {type}");
            }

            return contents[type](content);
        }
    }
}
