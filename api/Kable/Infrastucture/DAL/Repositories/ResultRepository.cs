using Domain.Entitiy;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.DAL.Repositories;

public class ResultRepository(DataContext context) : IResultRepository
{
    public async Task<Result> GetResultByIdAsync(int id)
    => await context.Results.FirstOrDefaultAsync(x => x.Id == id);
    public async Task<Result> AddResultAsync(Result result)
    {
        await context.Results.AddAsync(result);
        await context.SaveChangesAsync();
        return result;
    }

    public string GetResult()
    => "Gitara siema mordo :D :D :D :D :D :D :D :D :D :D :D :D :D :D :D :D";
    
}