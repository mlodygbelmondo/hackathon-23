using System.Security.Claims;

namespace Application.Services.interfaces;

public interface IUserContextService
{
    ClaimsPrincipal? User { get; }
    int? GetUserId { get; }
}