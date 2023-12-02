using Application.DTO;
using Domain.Entitiy;

namespace Application.Services.interfaces;

public interface IResultService
{
    Task<GetResultDto> GetResultByIdAsync(int id);
    Task<Result> AddResultAsync(ResultDto resultDto);
    string GetResult();
}