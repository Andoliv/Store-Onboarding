using Microsoft.AspNetCore.Mvc;
using Store_Onboarding.Server.Services;
using Store_Onboarding.Server.ViewModels;

namespace Store_Onboarding.Server.Controllers;

[ApiController]
[Route("api/sales")]
public class SalesController : Controller
{
    private readonly ISalesService _saleService;

    public SalesController(ISalesService saleService)
    {
        _saleService = saleService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<SalesViewModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetSales()
    {
        var sales = await _saleService.GetSales();

        return Ok(sales);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(SalesViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetSale(int id)
    {
        var sale = await _saleService.GetSale(id);

        if (sale == null)
        {
            return NotFound();
        }

        return Ok(sale);
    }

    [HttpPost]
    [ProducesResponseType(typeof(SalesViewModel), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateSale([FromBody] CreateSalesRequest sale)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var newSale = await _saleService.CreateSale(sale);

        return CreatedAtAction(nameof(GetSale), new { id = newSale.Id }, newSale);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(SalesViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateSale(int id, [FromBody] SalesViewModel sale)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedSale = await _saleService.UpdateSale(sale);

        return Ok(updatedSale);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteSale(int id)
    {
        await _saleService.DeleteSale(id);

        return NoContent();
    }
}
