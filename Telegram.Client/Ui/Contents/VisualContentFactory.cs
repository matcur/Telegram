using System;
using System.Collections.Generic;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Ui.Contents
{
    // TODO
    public class VisualContentFactory
    {
        private readonly Dictionary<ContentType, Func<Content, IContent>> _contents
            = new Dictionary<ContentType, Func<Content, IContent>>
            {
                { ContentType.Text, content => new TextContent(content.Value) }, 
                { ContentType.Image, content => new ImageContent(content.Value) }, 
            };

        public VisualContentFactory() {  }

        public VisualContentFactory(Dictionary<ContentType, Func<Content, IContent>> contents)
        {
            _contents = contents;
        }

        public IContent From(Content content)
        {
            var type = content.Type;
            if (!_contents.ContainsKey(type))
            {
                throw new Exception($"Can't create content from {type}");
            }

            return _contents[type](content);
        }
    }
}
