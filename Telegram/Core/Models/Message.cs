﻿namespace Telegram.Core.Models
{
    public class Message : Model
    {
        public static readonly Message Empty = new Message
        {
            Content = "",
        };

        public int Id { get; set; }

        public string Content { get; set; }

        public User Author { get; set; }
    }
}