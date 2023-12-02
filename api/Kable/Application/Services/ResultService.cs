using Application.DTO;
using Application.Services.interfaces;
using Domain.Entitiy;
using Domain.Repositories;

namespace Application.Services;

public class ResultService(IResultRepository resultRepository)
    : IResultService
{
    public async Task<ResultDto> GetResultByIdAsync(int id)
    {
        var result = await resultRepository.GetResultByIdAsync(id);
        return result.AsDto();
    }

    public async Task<Result> AddResultAsync(ResultDto resultDto)
    {
        var result = new Result
        {
            CableStrands = resultDto.CableStrands,
            CableType = resultDto.CableType,
            Charge = resultDto.Charge,
            EnvironmentalConditions = resultDto.EnvironmentalConditions,
            InstallationMethod = resultDto.InstallationMethod,
            Link = resultDto.Link
        };
        var resultJolo = await resultRepository.AddResultAsync(result);
        return resultJolo;
    }

    public string GetResult()
    {
        return resultRepository.GetResult();
    }
}