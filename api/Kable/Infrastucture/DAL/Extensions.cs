using Domain.Repositories;
using Infrastucture.DAL.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastucture.DAL;

public static class Extensions
{
    public static void AddDal(this IServiceCollection services)
    {
        services.AddScoped<IResultRepository, ResultRepository>();
    }
}