using Domain.Entitiy;

namespace Domain.Repositories;

public interface IRequestRepository
{
    Task<Request> GetRequestAsync(int id);
    IQueryable<Request> GetRequests();
    Task CreateRequestAsync(Request request);
    Task UpdateRequestAsync(Request request);
    
    
}