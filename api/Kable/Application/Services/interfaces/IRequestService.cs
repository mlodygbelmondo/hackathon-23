using Application.DTO;
using Application.DTO.Request;
using Domain.Entitiy;

namespace Application.Services.interfaces;

public interface IRequestService
{
    Task<GetRequestDto> GetRequestAsync(int id);
    Task<IEnumerable<GetRequestDto>> GetRequestsPending();
    Task<IEnumerable<GetRequestDto>> GetRequestsRejected();
    Task<IEnumerable<GetRequestDto>> GetRequestsAccepted();
    Task<Request> CreateRequestAsync(CreateRequestDto request);
    Task UpdateRequestAsync(int id,int Status);
    
}