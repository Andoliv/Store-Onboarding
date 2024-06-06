using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Store_Onboarding.Server.ViewModels;

public class CreateSalesRequest
{
    [JsonPropertyName("productId")]
    [Required(ErrorMessage = "Product is required!")]
    public int ProductId { get; set; }

    [JsonPropertyName("customerId")]
    [Required(ErrorMessage = "Customer is required!")]
    public int CustomerId { get; set; }

    [JsonPropertyName("storeId")]
    [Required(ErrorMessage = "Store is required!")]
    public int StoreId { get; set; }

    [JsonPropertyName("dateSold")]
    [Required(ErrorMessage = "Date Sold is required!")]
    public DateTime DateSold { get; set; }
}
