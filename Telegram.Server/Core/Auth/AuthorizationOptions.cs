using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Telegram.Server.Core.Auth
{
    public static class AuthorizationOptions
    {
        public const string Issuer = "TelegramServer";
        
        public const string Audience = "TelegramClient";
        
        public const string EncryptionKey = "THISISTHEREALLIFE12345";
        
        public const int LifeTimeMinutes = 60 * 60 * 24 * 7;

        public static readonly SecurityKey SecurityKey = new SymmetricSecurityKey(
            Encoding.ASCII.GetBytes(EncryptionKey)
        );
    }
}