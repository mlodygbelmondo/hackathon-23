using System.Security.AccessControl;
using Domain.Enums;

namespace Domain.Entitiy;

public class Result
{
    public int Id { get; set; }
    public CableType CableType { get; set; }
    public string CableStrands { get; set; }
    public decimal Charge { get; set; }
    public InstallationMethod InstallationMethod { get; set; }
    public EnvironmentalConditions EnvironmentalConditions { get; set; }
    public string Link { get; set; }
}
        