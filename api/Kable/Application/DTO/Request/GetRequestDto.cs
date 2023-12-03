using Application.DTO.Account;

namespace Application.DTO.Request;

public class GetRequestDto
{
    public int Id { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public int RequestState { get; set; }
    public DateTime CreatedAt { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int ResultId { get; set; }
}