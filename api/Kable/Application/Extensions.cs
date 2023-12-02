using Application.Services;
using Application.Services.interfaces;
using Application.Settings;
using Domain.Entitiy;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class Extensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services,IConfiguration Configuration)
    {
        services.Configure<AuthenticationSettings>(Configuration.GetSection("Authentication"));
        services.AddHttpContextAccessor();
        services.AddScoped<IResultService, ResultService>();
        services.AddScoped<IUserContextService, UserContextService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
        return services;
    }   
}