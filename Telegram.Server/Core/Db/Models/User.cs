﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Core.Db.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public Phone Phone { get; set; }

        public List<Code> Codes { get; set; } = new List<Code>();

        public List<Chat> Chats { get; set; } = new List<Chat>();

        public User() { }

        public User(RegisteringUser registration)
        {
            var phone = new Phone(registration.Phone);

            FirstName = registration.FirstName;
            LastName = registration.LastName;
            Phone = phone;
        }
    }
}