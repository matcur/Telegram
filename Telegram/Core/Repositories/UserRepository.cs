using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Db;
using Telegram.Db.Models;
using Telegram.Models;

namespace Telegram.Core.Repositories
{
    public class UserRepository
    {
        private readonly AppDb db;

        private readonly DbSet<DbUser> users;

        public UserRepository()
        {
            db = new AppDb();
            users = db.Users;
        }

        public Task Create(Phone phone)
        {
            var user = new DbUser
            {
                FirstName = "",
                LastName = "",
                Phone = new DbPhone(phone)
            };

            user.Codes.Add(new DbCode(new Code()));
            users.Add(user);
            
            return db.SaveChangesAsync();
        }
    }
}
