using Application.DTO;
using Application.Services.interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;
[ApiController]
[Route("[controller]")]
public class TestController(IResultService resultService) : ControllerBase
{
    
    [HttpGet("test")]
    public string Get()
    {
        return resultService.GetResult();
    }

    [HttpPost]
    public async Task<CreatedAtActionResult> Post(ResultDto resultDto)
    {
        var result = await resultService.AddResultAsync(resultDto);
        return CreatedAtAction(nameof(Get), new { id = result.Id }, result.AsDto());
    }
}