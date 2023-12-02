using Application.DTO;
using Domain.Entitiy;

namespace Application.Services.interfaces;

public interface IResultService
{
    Task<ResultDto> GetResultByIdAsync(int id);
    Task<Result> AddResultAsync(ResultDto resultDto);
    string GetResult();
}