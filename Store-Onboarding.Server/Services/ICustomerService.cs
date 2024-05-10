using Store_Onboarding.Server.ViewModels;

namespace Store_Onboarding.Server.Services;

public interface ICustomerService
{
    Task<IEnumerable<CustomerViewModel>> GetCustomers();
    Task<CustomerViewModel> GetCustomer(int id);
    Task<CustomerViewModel> CreateCustomer(CreateCustomerRequest request);
    Task<CustomerViewModel> UpdateCustomer(int id, CreateCustomerRequest request);
    Task DeleteCustomer(int id);
}
