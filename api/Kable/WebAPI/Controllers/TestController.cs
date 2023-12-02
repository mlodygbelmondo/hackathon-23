using Application.Services.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;
[ApiController]
[Route("[controller]")]
public class TestController(IResultService resultService)
{
    [HttpGet("test")]
    public string Get()
    {
        return resultService.GetResult();
    }
}