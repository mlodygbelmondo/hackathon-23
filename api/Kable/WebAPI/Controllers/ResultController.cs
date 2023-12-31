using Application.DTO;
using Application.Services.interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;
[ApiController]
[Route("api/[controller]")]
public class ResultController(IResultService resultService) : ControllerBase
{
    
    [HttpGet("test")]
    public string Get()
    {
        return resultService.GetResult();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<GetResultDto>> Get(int id)
    {
        var result = await resultService.GetResultByIdAsync(id);
        if (result is null)
            return NotFound();
        return result;
    }

    [HttpPost]
    public async Task<CreatedAtActionResult> Post(ResultDto resultDto)
    {
        var result = await resultService.AddResultAsync(resultDto);
        return CreatedAtAction(nameof(Get), new { id = result.Id }, result.AsDto());
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<GetResultDto>>> GetResults()
    {
        var results = await resultService.GetResultsAsync();
        return Ok(results);
    }
}