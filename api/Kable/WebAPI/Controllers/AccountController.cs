using Application.DTO;
using Application.DTO.Account;
using Application.Services.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{ 
    IUserService _accountService;
    IUserContextService _userContextService;
    
    public AccountController(IUserService userService, IUserContextService userContextService)
    {
        _accountService = userService;
        _userContextService = userContextService;
    }
    
    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> MeAsync()
    {
        return Ok( await _accountService.GetAccountAsync());
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<GetAccountDto>> Get(int id)
    {
        var result = await _accountService.GetUserByIdAsync(id);
        if (result is null)
            return NotFound();
        return result;
    }
    
    
    [HttpPost("register")]
    public async Task<IActionResult> RegisterUserAsync(RegisterUserDto registerUserDto)
    {
        var user = await _accountService.AddUserAsync(registerUserDto);  
        return CreatedAtAction(nameof(Get), new { id = user.Id }, user.AsDto());
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var token = await _accountService.GenerateJwt(loginDto);
        return Ok(token);
    }

}