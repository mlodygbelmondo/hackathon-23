using Domain.Entitiy;

namespace Domain.Repositories;

public interface IResultRepository
{
    Task<Result> GetResultByIdAsync(int id);
}