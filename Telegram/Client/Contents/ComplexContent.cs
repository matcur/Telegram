using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using Telegram.Core.Models;

namespace Telegram.Client.Contents
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
                    (x, y) => x.DisplayOrder > y.DisplayOrder ? -1 : 1
                );

                foreach (var content in contents)
                {
                    stack.Children.Add(content.VisualPresentation);
                }

                return stack;
            }
        }

        private readonly List<IContent> contents = new List<IContent>();

        public ComplexContent(IEnumerable<Content> contents)
        {
            var factory = new VisualContentFactory();
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
