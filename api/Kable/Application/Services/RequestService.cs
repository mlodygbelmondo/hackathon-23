using Application.DTO;
using Application.DTO.Request;
using Application.Services.interfaces;
using Domain.Entitiy;
using Domain.Enums;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class RequestService : IRequestService
{
    private readonly IRequestRepository _requestRepository;
    private readonly IUserContextService _userContextService;
    private readonly IResultRepository _resultRepository;
    public RequestService(IRequestRepository requestRepository, IUserContextService userContextService, IResultRepository resultRepository)
    {
        _requestRepository = requestRepository;
        _userContextService = userContextService;
        _resultRepository = resultRepository;
    }
    
    public async Task<GetRequestDto> GetRequestAsync(int id)
    {
        var request = await _requestRepository.GetRequestAsync(id);
        return request.AsRequestDto();
    }

    public async Task<IEnumerable<GetRequestDto>> GetRequestsPending()
    {
        var requests = await _requestRepository.GetRequests().Where(x => x.RequestState == 0).ToListAsync();
        return requests.Select(x => x.AsRequestDto());
    }

    public async Task<IEnumerable<GetRequestDto>> GetRequestsRejected()
    {
        var requests = await _requestRepository.GetRequests().Where(x => x.RequestState == 1).ToListAsync();
        return requests.Select(x => x.AsRequestDto());
    }

    public async Task<IEnumerable<GetRequestDto>> GetRequestsAccepted()
    {
        var requests = await _requestRepository.GetRequests().Where(x => x.RequestState == 2).ToListAsync();
        return requests.Select(x => x.AsRequestDto());
    }

    public async Task<Request> CreateRequestAsync(CreateRequestDto request)
    {
        var result = await _resultRepository.GetResultsAsync();
        var resultId = result.Last().Id;

        var newRequest = request.AsRequest();
        newRequest.ResultId = resultId;
        newRequest.RequestState = 0;
        await _requestRepository.CreateRequestAsync(newRequest);
        return newRequest;
    }

    public async Task UpdateRequestAsync(int id, int Status)
    {
        var request =await _requestRepository.GetRequestAsync(id);
        request.RequestState = Status;
        await _requestRepository.UpdateRequestAsync(request);
    }
}