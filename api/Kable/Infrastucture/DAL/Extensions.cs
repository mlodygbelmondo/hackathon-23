using Domain.Repositories;
using Infrastucture.DAL.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastucture.DAL;

public static class Extensions
{
    public static IServiceCollection AddDal(this IServiceCollection services)
    {
        services.AddScoped<IResultRepository, ResultRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        return services;
    }
}