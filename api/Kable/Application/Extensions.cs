using Application.Services;
using Application.Services.interfaces;
using Domain.Entitiy;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class Extensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IResultService, ResultService>();
        return services;
    }   
}