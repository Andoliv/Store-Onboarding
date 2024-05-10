using Store_Onboarding.Server.ViewModels;

namespace Store_Onboarding.Server.Services;

public interface IProductService
{
    Task<IEnumerable<ProductViewModel>> GetProducts();
    Task<ProductViewModel> GetProduct(int id);
    Task<ProductViewModel> CreateProduct(CreateProductRequest request);
    Task<ProductViewModel> UpdateProduct(int id, CreateProductRequest request);
    Task DeleteProduct(int id);
}
