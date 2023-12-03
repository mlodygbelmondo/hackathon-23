namespace Application.DTO.Request;

public class CreateRequestDto
{
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    
}