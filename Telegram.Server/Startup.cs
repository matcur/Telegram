using System;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Sherden.AspNet.Filesystem;
using Telegram.Server.Core.Auth;
using Telegram.Server.Core.Auth.Security;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Domain.Bots;
using Telegram.Server.Core.Extensions;
using Telegram.Server.Core.Notifications;
using Telegram.Server.Core.Services.Controllers;
using Telegram.Server.Core.Services.Hubs;
using Telegram.Server.Web.Hubs;

namespace Telegram.Server
{
    public class Startup
    {
        public const string HubsRoutePrefix = "/hubs";
        
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
                        options.Events = new JwtBearerEvents
                        {
                            OnMessageReceived = context =>
                            {
                                var request = context.HttpContext.Request;
                                if (request.Path.StartsWithSegments(HubsRoutePrefix,
                                        StringComparison.OrdinalIgnoreCase) &&
                                    request.Query.TryGetValue("access_token", out var authorizeToken))
                                {
                                    context.Token = authorizeToken;
                                }

                                return Task.CompletedTask;
                            }
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
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<AuthorizedUser>();
            services.AddScoped<ChatHubService>();
            services.AddScoped<UserHubService>();
            services.AddScoped<UserService>();
            services.AddScoped<AuthorizedUserService>();
            services.AddScoped<ChatService>();
            services.AddScoped<MessageService>();
            services.AddScoped<ChatBots>();
            services.AddScoped<ChatEvents>();
            
            services.AddSpaStaticFiles(
                configuration => configuration.RootPath = "wwwroot"
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

            app.UseException();

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
                endpoints.MapHub<ChatHub>($"{HubsRoutePrefix}/chats");
                endpoints.MapHub<UserHub>($"{HubsRoutePrefix}/user");
                endpoints.MapHub<ActivityHub>($"{HubsRoutePrefix}/activity");
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
