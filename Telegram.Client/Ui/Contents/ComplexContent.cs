using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Ui.Contents
{
    public class ComplexContent : IContent
    {
        public int DisplayOrder => 10000;

        public string Description => "Complex content";

        public FrameworkElement VisualPresentation
        {
            get
            {
                var stack = new StackPanel();
                contents.Sort(
                    (x, y) => y.DisplayOrder - x.DisplayOrder
                );

                foreach (var content in contents)
                {
                    stack.Children.Add(content.VisualPresentation);
                }

                return stack;
            }
        }

        private readonly List<IContent> contents = new List<IContent>();

        public ComplexContent(IEnumerable<Content> contents, VisualContentFactory factory)
        {
            foreach (var content in contents)
            {
                this.contents.Add(factory.From(content));
            }
        }

        public ComplexContent(IEnumerable<IContent> contents)
        {
            this.contents.AddRange(contents);
        }
    }
}
