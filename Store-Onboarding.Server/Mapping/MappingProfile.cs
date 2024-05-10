using AutoMapper;
using StoreReact.Models;
using StoreReact.ViewModels;

namespace StoreReact.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Customer, CustomerViewModel>();
        CreateMap<CustomerViewModel, Customer>();
        CreateMap<CreateCustomerRequest, Customer>();
        CreateMap<Customer, CreateCustomerRequest>();
    }
}
