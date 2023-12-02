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
            Link = result.Link
        };
    }
}