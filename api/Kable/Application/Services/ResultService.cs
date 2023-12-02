using Application.DTO;
using Application.Services.interfaces;
using Domain.Entitiy;
using Domain.Enums;
using Domain.Repositories;

namespace Application.Services;

public class ResultService(IResultRepository resultRepository)
    : IResultService
{
    public async Task<ICollection<GetResultDto>> GetResultsAsync()
    {
       var results = await resultRepository.GetResultsAsync();
       return results.Select(x => x.AsResultdwa()).ToList();
    }

    public async Task<GetResultDto> GetResultByIdAsync(int id)
    {
        var result = await resultRepository.GetResultByIdAsync(id);
        var x = result.AsResultdwa();
        return x;
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
            Link = GetLink(resultDto.CableType)
        };
        var resultJolo = await resultRepository.AddResultAsync(result);
        return resultJolo;  
    }

    public string GetResult()
    {
        return resultRepository.GetResult();
    }
    
    private string GetLink(CableType cableType)
    {
        return cableType switch
        {
            CableType.N2HX => @"https://www.nkt.com.pl/produkty-rozwiazania/niskie-napiecie/kable-1-kv/nopovic-n2xh-0-6-1-kv",
            CableType.YAKXS => @"https://www.nkt.com.pl/produkty-rozwiazania/niskie-napiecie/kable-1-kv/yakxs-0-6-1-kv",
            CableType.YKY => @"https://www.nkt.com.pl/produkty-rozwiazania/niskie-napiecie/kable-1-kv/yky-0-6-1-kv",
            CableType.YKXS => @"https://www.nkt.com.pl/produkty-rozwiazania/niskie-napiecie/kable-1-kv/ykxs-0-6-1-kv",
            CableType.YDY => @"https://www.nkt.com.pl/produkty-rozwiazania/niskie-\nnapiecie/przewody-instalacyjne/ydy-450-750-v",
            CableType.YDYp => @"https://www.nkt.com.pl/produkty-rozwiazania/niskie-napiecie/przewody-instalacyjne/nkt-instal-ydyp-450-750-v",
            _ => throw new ArgumentOutOfRangeException(nameof(cableType), cableType, null)
        };
    }
    
}