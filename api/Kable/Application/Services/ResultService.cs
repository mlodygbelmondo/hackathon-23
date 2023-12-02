using Application.Services.interfaces;
using Domain.Repositories;

namespace Application.Services;

public class ResultService(IResultRepository resultRepository)
    : IResultService
{
    public string GetResult()
    {
        return resultRepository.GetResult();
    }
}