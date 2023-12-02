using Application.DTO.Account;

namespace Application.DTO.Request;

public class GetRequestDto
{
    public int Id { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public int RequestState { get; set; }
    public DateTime CreatedAt { get; set; }
    public int UserId { get; set; }
    public GetResultDto GetResultDto { get; set; }
    public int ResultId { get; set; }
    public GetAccountDto GetAccountDto { get; set; }
}