﻿using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Mapping
{
    public class UserMap
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FullName => FirstName + " " + LastName;

        public string AvatarUrl { get; set; }

        public PhoneMap? Phone { get; set; }

        public UserMap() { }

        public UserMap(User user)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            AvatarUrl = user.AvatarUrl;
            Phone = new PhoneMap(user.Phone);
        }
    }
}