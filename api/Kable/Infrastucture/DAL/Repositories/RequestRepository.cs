using Domain.Entitiy;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.DAL.Repositories;

public class RequestRepository : IRequestRepository
{
    private readonly DataContext _context;

    public RequestRepository(DataContext context)
    {
        _context = context;
    }
    
    public async Task<Request> GetRequestAsync(int id) => await _context.Requests.FirstOrDefaultAsync(x => x.Id == id);

    public IQueryable<Request> GetRequests() => _context.Requests
        .Include(x=>x.Result)
        .AsQueryable();

    public async Task CreateRequestAsync(Request request)
    {
        await _context.Requests.AddAsync(request);
        await _context.SaveChangesAsync();
        
    }

    public async Task UpdateRequestAsync(Request request)
    {
        _context.Requests.Update(request);
        await _context.SaveChangesAsync();
    }
}