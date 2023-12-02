using Domain.Entitiy;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.DAL.Repositories;

public class ResultRepository : IResultRepository
{
    private readonly DataContext _context;

    public ResultRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<Result> GetResultByIdAsync(int id)
    => await _context.Results.FirstOrDefaultAsync(x => x.Id == id);
    
}