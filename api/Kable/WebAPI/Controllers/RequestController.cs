using Application.DTO.Request;
using Application.Services.interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;
[ApiController]
[Route("api/[controller]")]
public class RequestController : ControllerBase
{
    private readonly IRequestService _requestService;

    public RequestController(IRequestService requestService)
    {
        _requestService = requestService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetRequestsAsync()
    {
        var requests = await _requestService.GetRequestsAsync();
        return Ok(requests);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetRequestAsync(int id)
    {
        var request = await _requestService.GetRequestAsync(id);
        return Ok(request);
    }
    
    [HttpGet("pending")]
    public async Task<IActionResult> GetRequestsPending()
    {
        var requests = await _requestService.GetRequestsPending();
        return Ok(requests);
    }
    
    [HttpGet("rejected")]
    public async Task<IActionResult> GetRequestsRejected()
    {
        var requests = await _requestService.GetRequestsRejected();
        return Ok(requests);
    }
    
    [HttpGet("accepted")]
    public async Task<IActionResult> GetRequestsAccepted()
    {
        var requests = await _requestService.GetRequestsAccepted();
        return Ok(requests);
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateRequestAsync(CreateRequestDto request)
    {
        var newRequest = await _requestService.CreateRequestAsync(request);
        return Created($"/api/request/{newRequest.Id}", null);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRequestAsync(int id,[FromBody] ChangeStateDto state)
    {
        await _requestService.UpdateRequestAsync(id, state.RequestState);
        return NoContent();
    }
    
    
}