using Application.DTO.Account;
using Application.DTO.Request;
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
            Link = getResultDto.Link,
            LinkPhoto = getResultDto.LinkPhoto
        };
    }

    #region UserExtensions
    public static GetAccountDto AsDto(this User user)
    {
        return new GetAccountDto
        {
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Role = user.Role
        };
    }
    
    public static User AsUser(this GetAccountDto userDto)
    {
        return new User
        {
            FirstName = userDto.FirstName,
            LastName = userDto.LastName,
            Email = userDto.Email,
            Role = userDto.Role
        };
    }
    
    public static User AsUser(this RegisterUserDto registerUserDto)
    {
        return new User
        {
            FirstName = registerUserDto.FirstName,
            LastName = registerUserDto.LastName,
            Email = registerUserDto.Email,
            Password = registerUserDto.Password,
            Role = registerUserDto.Role
        };
    }
    
    #endregion

    #region Request
    public static GetRequestDto AsRequestDto(this Domain.Entitiy.Request request)
    {
        var XD =  new GetRequestDto
        {
            Id = request.Id,
            Latitude = request.Latitude,
            Longitude = request.Longitude,
            CreatedAt = request.CreatedAt,
            FirstName = request.FirstName,
            LastName = request.LastName,
            ResultId = request.ResultId,
            RequestState = request.RequestState
        };
        return XD;
    }
    
    public static Domain.Entitiy.Request AsRequest(this CreateRequestDto createRequestDto)
    {
        return new Domain.Entitiy.Request
        {
            Latitude = createRequestDto.Latitude,
            Longitude = createRequestDto.Longitude,
            CreatedAt = DateTime.Now.ToUniversalTime(),
            FirstName = createRequestDto.FirstName,
            LastName = createRequestDto.LastName,
            RequestState = 0
        };
    }
    

    #endregion
    
}