using Domain.Enums;

namespace Application.DTO;

public class GetResultDto
{
    public CableType CableType { get; set; }
    public string CableStrands { get; set; }
    public decimal Charge { get; set; }
    public InstallationMethod InstallationMethod { get; set; }
    public EnvironmentalConditions EnvironmentalConditions { get; set; }
    public string Link { get; set; }
    public string LinkPhoto { get; set; }
}