using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.DTO;
using Application.DTO.Account;
using Application.Services.interfaces;
using Application.Settings;
using Domain.Entitiy;
using Domain.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly IUserContextService _userContextService;
    private readonly AuthenticationSettings _authenicationSettings;

    public UserService(IUserRepository userRepository,IOptions<AuthenticationSettings> authenicationSettings, IUserContextService userContextService, IPasswordHasher<User> passwordHasher)
    {
        _userRepository = userRepository;
        _authenicationSettings = authenicationSettings.Value;
        _userContextService = userContextService;
        _passwordHasher = passwordHasher;
    }
    
    public async Task<GetAccountDto> GetUserByEmailAsync(string email)
    {
      var user =  await _userRepository.GetUserByEmailAsync(email);
      return user.AsDto();
    }

    public async Task<GetAccountDto> GetUserByIdAsync(int id)
    {
        var user = await _userRepository.GetUserByIdAsync(id);
        return user.AsDto();
    }

    public async Task<ICollection<GetAccountDto>> GetUsersAsync()
    {
        var users = await _userRepository.GetUsersAsync();
        return users.Select(x => x.AsDto()).ToList();
    }

    public async Task<User> AddUserAsync(RegisterUserDto registerUserDto)
    {
        var hashedpassword = _passwordHasher.HashPassword(null,registerUserDto.Password);
        var user = new User
        {
            FirstName = registerUserDto.FirstName,
            LastName = registerUserDto.LastName,
            Email = registerUserDto.Email,
            Password = hashedpassword,
            Role = registerUserDto.Role
        };
        
        var userJolo = await _userRepository.AddUserAsync(user);
        return userJolo;
    }

    public async Task<object> GenerateJwt(LoginDto loginDto)
    {
        var user = await _userRepository.GetUserByEmailAsync(loginDto.Email);
        if (user is null)
        {
            throw new Exception("nieprawidłowy email lub hasło");
        }
        var result = _passwordHasher.VerifyHashedPassword(user,user.Password,loginDto.Password);
        if (result == PasswordVerificationResult.Failed)
        {
            throw new Exception("nieprawidłowy email lub hasło");
        }

        var claims = new List<Claim>()
        {
            new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
            new Claim(ClaimTypes.Name,$"{user.FirstName} {user.LastName}"),
            new Claim(ClaimTypes.Role,user.Role)
        };
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenicationSettings.JwtKey));
        var creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);
        var expires = DateTime.Now.AddDays(_authenicationSettings.JwtExpireDays);
        
        var token = new JwtSecurityToken(_authenicationSettings.JwtIssuer,
            _authenicationSettings.JwtIssuer,
            claims,
            expires: expires,
            signingCredentials: creds);
        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }

    public async Task<GetAccountDto> GetAccountAsync()
    {
        var i =_userContextService.GetUserId;
        var existingUser = await _userRepository.GetUserByIdAsync(i);
        if (existingUser is null)
        {
            throw new Exception("użytkownik nie znaleziony");
        }

        return existingUser.AsDto();
    }
}