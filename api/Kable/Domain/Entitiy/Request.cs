using Domain.Enums;

namespace Domain.Entitiy;

public class Request
{
    public int Id { get; set; }
    public decimal LatitudeX { get; set; }
    public decimal LongitudeY { get; set; }
    public RequestState RequestState { get; set; }
    public DateTime CreatedAt { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public int ResultId { get; set; }
    public Result Result { get; set; }
}