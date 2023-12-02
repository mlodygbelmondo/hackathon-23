using Domain.Entitiy;

namespace Domain.Repositories;

public interface IResultRepository
{
    Task<ICollection<Result>> GetResultsAsync();
    Task<Result> GetResultByIdAsync(int id);
    Task<Result> AddResultAsync(Result result);
    string GetResult();
}