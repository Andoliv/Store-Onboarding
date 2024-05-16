using Store_Onboarding.Server.ViewModels;

namespace Store_Onboarding.Server.Services;

public interface ISalesService
{
    Task<IEnumerable<SalesViewModel>> GetSales();
    Task<SalesViewModel> GetSale(int id);
    Task<SalesViewModel> CreateSale(CreateSalesRequest request);
    Task<SalesViewModel> UpdateSale(CreateSalesRequest request);
    Task<SalesViewModel> DeleteSale(int id);
}
