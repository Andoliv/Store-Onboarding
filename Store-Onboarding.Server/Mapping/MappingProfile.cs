using AutoMapper;
using Store_Onboarding.Server.ViewModels;
using Store_Onboarding.Server.Models;

namespace Store_Onboarding.Server.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Customer, CustomerViewModel>();
        CreateMap<CustomerViewModel, Customer>();
        CreateMap<CreateCustomerRequest, Customer>();
        CreateMap<Customer, CreateCustomerRequest>();

        CreateMap<Product, ProductViewModel>();
        CreateMap<ProductViewModel, Product>();
        CreateMap<CreateProductRequest, Product>();
        CreateMap<Product, CreateProductRequest>();

        CreateMap<Store, StoreViewModel>();
        CreateMap<StoreViewModel, Store>();
        CreateMap<CreateStoreRequest, Store>();
        CreateMap<Store, CreateStoreRequest>();
    }
}
