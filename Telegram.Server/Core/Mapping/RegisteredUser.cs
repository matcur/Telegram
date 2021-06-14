using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Mapping.Response
{
    public class RegisteredUser
    {
        public int Id => user.Id;

        public string FirstName => user.FirstName;

        public string LastName => user.LastName;

        public PhoneMap Phone => new PhoneMap(user.Phone);

        public List<CodeMap> Codes => user.Codes.Select(c => new CodeMap(c)).ToList();

        private User user;

        public RegisteredUser(User user)
        {
            this.user = user;
        }
    }
}
