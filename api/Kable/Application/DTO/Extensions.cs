using Domain.Entitiy;

namespace Application.DTO;

public static class Extensions
{
    public static ResultDto AsDto(this Result result)
    {
        return new ResultDto
        {
            CableStrands = result.CableStrands,
            CableType = result.CableType,
            Charge = result.Charge,
            EnvironmentalConditions = result.EnvironmentalConditions,
            InstallationMethod = result.InstallationMethod,
        };
    }

    public static Result AsResult(this ResultDto resultDto)
    {
        return new Result
        {
            CableStrands = resultDto.CableStrands,
            CableType = resultDto.CableType,
            Charge = resultDto.Charge,
            EnvironmentalConditions = resultDto.EnvironmentalConditions,
            InstallationMethod = resultDto.InstallationMethod,
        };
    }
    
    public static GetResultDto AsResultdwa(this Result getResultDto)
    {
        return new GetResultDto()
        {
            CableStrands = getResultDto.CableStrands,
            CableType = getResultDto.CableType,
            Charge = getResultDto.Charge,
            EnvironmentalConditions = getResultDto.EnvironmentalConditions,
            InstallationMethod = getResultDto.InstallationMethod,
            Link = getResultDto.Link
        };
    }
    
}