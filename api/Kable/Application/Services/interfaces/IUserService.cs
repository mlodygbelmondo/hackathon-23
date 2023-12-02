using Application.DTO.Account;
using Domain.Entitiy;

namespace Application.Services.interfaces;

public interface IUserService
{
    Task<GetAccountDto> GetUserByEmailAsync(string email);
    Task<GetAccountDto> GetUserByIdAsync(int id);
    Task<ICollection<GetAccountDto>> GetUsersAsync();
    Task<User> AddUserAsync(RegisterUserDto registerUserDto);
    Task<object> GenerateJwt(LoginDto loginDto);
    Task<GetAccountDto> GetAccountAsync();
}