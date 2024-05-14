using System.ComponentModel.DataAnnotations;

namespace Store_Onboarding.Server.Models;

public class Store
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Address { get; set; }
    public DateTime Created { get; set; }
    public DateTime Updated { get; set; }
    public ICollection<Sales>? Sales { get; set; }
}
