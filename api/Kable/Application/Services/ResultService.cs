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
            Link = GetLink(resultDto.CableType),
            LinkPhoto = GetLinkPhoto(resultDto.CableType)
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
    private string GetLinkPhoto(CableType cableType)
    {
        return cableType switch
        {
            CableType.N2HX => @"https://www.nkt.com.pl/imgproxy/DYMVpfuCpV0BCd-qT28ZbmZSF_h29b6zQKTzTX9EhkY/rt:fit/w:378/h:294/g:ce/ex:1/el:1/aHR0cHM6Ly9ua3Qud2lkZW4ubmV0L2NvbnRlbnQvcGtzNXlnbWhvci9wbmcvTk9QT1ZJQy1OMlhILnBuZz9sYXN0TW9kaWZpZWQ9VGh1K0p1bCswNCsxNSUzQTU4JTNBMjIrQ0VTVCsyMDE5.jpeg",
            CableType.YAKXS => @"https://www.nkt.com.pl/imgproxy/vlErY7ryIT1V4-QktXs03qnnzIOAZ6B_37BBXkXNiJU/rt:fit/w:1600/h:800/g:ce/ex:1/el:1/aHR0cHM6Ly9ua3Qud2lkZW4ubmV0L2NvbnRlbnQvOWd3aDRndmN5di9wbmcvWEFLWFMucG5nP2xhc3RNb2RpZmllZD1Nb24rQXVnKzMxKzE3JTNBMzclM0E0MitDRVNUKzIwMjA.jpeg",
            CableType.YKY => @"https://www.nkt.com.pl/imgproxy/eR5Z7NHYCGmqv4lY3C4eVY0WGq1HrSHMLrbbJ36XbwA/rt:fit/w:704/h:0/g:ce/ex:1/el:1/aHR0cHM6Ly9ua3Qud2lkZW4ubmV0L2NvbnRlbnQvODR3YW5kYnh6ei9wbmcvWW5LWS5wbmc_bGFzdE1vZGlmaWVkPUZyaStTZXArMDQrMTUlM0E0NiUzQTM2K0NFU1QrMjAyMA.jpeg",
            CableType.YKXS => @"https://www.nkt.com.pl/imgproxy/JDKIdLggzkyQnmW8qkb7ZqPvYWOxEt_div-OpBJ04N4/rt:fit/w:1600/h:800/g:ce/ex:1/el:1/aHR0cHM6Ly9ua3Qud2lkZW4ubmV0L2NvbnRlbnQvODR3YW5kYnh6ei9wbmcvWW5LWS5wbmc_bGFzdE1vZGlmaWVkPUZyaStTZXArMDQrMTUlM0E0NiUzQTM2K0NFU1QrMjAyMA.jpeg",
            CableType.YDY => @"https://www.nkt.com.pl/imgproxy/eo6R1XVIMNgZKZFgAqeHYhRoHD2fxWOVLQx3qBuNKWg/rt:fit/w:1600/h:800/g:ce/ex:1/el:1/aHR0cHM6Ly9ua3Qud2lkZW4ubmV0L2NvbnRlbnQvMmV1cXgzNm1waS9wbmcvWURZxbxvXzN4MSw1X3MucG5nP2xhc3RNb2RpZmllZD1UdWUrTWFyKzA4KzE0JTNBMjElM0ExNitDRVQrMjAyMg.jpeg",
            CableType.YDYp => @"https://www.nkt.com.pl/imgproxy/0kGpkzy8ai8CPATOnJXEg2FzUckBDM-ONRkSBrGnqJo/rt:fit/w:1600/h:800/g:ce/ex:1/el:1/aHR0cHM6Ly9ua3Qud2lkZW4ubmV0L2NvbnRlbnQvYnN5Z2F5aWNjZy9wbmcvbmt0X2luc3RhbF9ZRFlwXzNfenlseS16by0yMDE4LTA1LWJlei1sb2dhLTM2MDB4MjcwMHB4LnBuZz9sYXN0TW9kaWZpZWQ9VHVlK1NlcCswMSsxMiUzQTA2JTNBMjUrQ0VTVCsyMDIw.jpeg",
            _ => throw new ArgumentOutOfRangeException(nameof(cableType), cableType, null)
        };
    }
}