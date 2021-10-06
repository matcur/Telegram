using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.IdentityModel.Tokens;
using Telegram.Server.Core.Db;
using Newtonsoft.Json;
using Telegram.Server.Core.Auth;
using Telegram.Server.Core.Auth.Security;
using Telegram.Server.Web.Hubs;
using System.IdentityModel.Tokens.Jwt;
using Sherden.AspNet.Filesystem;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.OpenApi.Models;

namespace Telegram.Server
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
     
        private readonly IWebHostEnvironment _environment;

        private const string DefaultCors = "defaultCors";

        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _environment = environment;
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(DefaultCors,
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
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
            services.AddMvc()
                    .AddNewtonsoftJson(options => 
                    {
                        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    });
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo {Version = "1.0", Title = "Telegram Api"});
            });
            services.AddDbContext<AppDb>();
            services.AddSignalR();
            
            services.AddFileSystem(_environment.WebRootPath);

            services.AddTransient<IAuthorizationToken>(services =>
            {
                return new TelegramToken(
                    AuthorizationOptions.Issuer,
                    AuthorizationOptions.Audience,
                    AuthorizationOptions.LifeTimeMinutes
                );
            });
            services.AddTransient<SecurityTokenHandler, JwtSecurityTokenHandler>();
            services.AddTransient<UserIdentity>();
            
            services.AddSpaStaticFiles(
                configuration => configuration.RootPath = "ClientApp/build"
            );
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseRouting();

            app.UseCors(DefaultCors);

            app.UseAuthentication();
            app.UseAuthorization();
            
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("v1/swagger.json", "My API V1");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chats");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
