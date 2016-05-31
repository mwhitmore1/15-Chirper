using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Chirper.API.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;

namespace Chirper.API.Infrastructure
{
    public class AuthorizationRepository : IDisposable
    {
        private ChirperDataContext _ctx;

        private UserManager<User> _userManager;

        public AuthorizationRepository()
        {
            _ctx = new ChirperDataContext();
            _userManager = new UserManager<User>(new UserStore<User>(_ctx));
        }

        public async Task<IdentityResult> RegisterUser(RegistrationModel userModel)
        {
            User user = new User
            {
                UserName = userModel.EmailAddress,
                Email = userModel.EmailAddress
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }

        public async Task<User> FindUser(string userName, string password)
        {
            User user = await _userManager.FindAsync(userName, password);

            return user;
        }

        public async Task<User> FindUserByName(string name)
        {
            User user = await _userManager.FindByNameAsync(name);

            return user;
        }

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();
        }
    }
}