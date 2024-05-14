using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Store_Onboarding.Server.Models;
using Store_Onboarding.Server.ViewModels;

namespace Store_Onboarding.Server.Services;

public class SalesService : ISalesService
{
    private readonly StoreDbContext _context;
    private readonly IMapper _mapper;

    public SalesService(StoreDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<SalesViewModel>> GetSales()
    {
        var sales = await _context.Sales.ToListAsync();

        return _mapper.Map<IEnumerable<SalesViewModel>>(sales);
    }

    public async Task<SalesViewModel> GetSale(int id)
    {
        var sale = await _context.Sales.FirstOrDefaultAsync(sale => sale.Id == id);

        if (sale == null)
        {
            throw new Exception("Sale not found!");
        }

        return _mapper.Map<SalesViewModel>(sale);
    }

    public async Task<SalesViewModel> CreateSale(CreateSalesRequest request)
    {
        var sale = _mapper.Map<Sales>(request);
        sale.DateSold = DateTime.Now;

        _context.Sales.Add(sale);
        await _context.SaveChangesAsync();

        return _mapper.Map<SalesViewModel>(sale);
    }

    public async Task<SalesViewModel> UpdateSale(SalesViewModel sale)
    {
        var saleToUpdate = await _context.Sales.FirstOrDefaultAsync(sale => sale.Id == sale.Id);

        if (saleToUpdate == null)
        {
            throw new Exception("Sale not found!");
        }

        saleToUpdate = _mapper.Map(sale, saleToUpdate);
        saleToUpdate.Updated = DateTime.Now;

        await _context.SaveChangesAsync();

        return _mapper.Map<SalesViewModel>(saleToUpdate);
    }

    public async Task<SalesViewModel> DeleteSale(int id)
    {
        var sale = await _context.Sales.FirstOrDefaultAsync(sale => sale.Id == id);

        if (sale == null)
        {
            throw new Exception("Sale not found!");
        }

        _context.Sales.Remove(sale);
        await _context.SaveChangesAsync();

        return _mapper.Map<SalesViewModel>(sale);
    }
}
