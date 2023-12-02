using System.Security.Claims;
using Application.Services.interfaces;
using Microsoft.AspNetCore.Http;

namespace Application.Services;

public class UserContextService : IUserContextService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserContextService(IHttpContextAccessor contextAccessor)
    {
        _httpContextAccessor = contextAccessor;
    }
    
    
    public ClaimsPrincipal? User => _httpContextAccessor.HttpContext?.User;
    public int? GetUserId => User is null ? null: int.Parse(User?.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value);
}