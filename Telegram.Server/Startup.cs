using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Telegram.Server.Core.Db;
using Newtonsoft.Json;
using Telegram.Server.Core.Auth;
using Telegram.Server.Core.Auth.Security;
using Telegram.Server.Web.Hubs;

namespace Telegram.Server
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidIssuer = AuthorizationOptions.Issuer,
                            ValidateAudience = true,
                            ValidAudience = AuthorizationOptions.Audience,
                            ValidateLifetime = true,
                            IssuerSigningKey = AuthorizationOptions.SecurityKey,
                        };
                    });
            services.AddControllersWithViews()
                    .AddNewtonsoftJson(options => 
                    {
                        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    });
            services.AddDbContext<AppDb>();
            services.AddSignalR();

            services.AddTransient<IAuthorizationToken>(services =>
            {
                var token = new TelegramToken(
                    AuthorizationOptions.Issuer,
                    AuthorizationOptions.Audience,
                    AuthorizationOptions.LifeTimeMinutes
                );

                return new EncodedToken(token, new JwtSecurityTokenHandler());
            });
            services.AddTransient<UserIdentity>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseRouting();

            app.UseCors(builder => builder.AllowAnyOrigin());

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chats");
            });
        }
    }
}
