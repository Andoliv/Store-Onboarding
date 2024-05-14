using Microsoft.AspNetCore.Mvc;
using Store_Onboarding.Server.Services;
using Store_Onboarding.Server.ViewModels;

namespace Store_Onboarding.Server.Controllers;

[ApiController]
[Route("api/stores")]
public class StoreController : Controller
{
    private readonly IStoreService _storeService;

    public StoreController(IStoreService storeService)
    {
        _storeService = storeService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<StoreViewModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetStores()
    {
        var stores = await _storeService.GetStores();

        return Ok(stores);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(StoreViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetStore(int id)
    {
        var store = await _storeService.GetStore(id);

        if (store == null)
        {
            return NotFound();
        }

        return Ok(store);
    }

    [HttpPost]
    [ProducesResponseType(typeof(StoreViewModel), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateStore([FromBody] CreateStoreRequest store)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var newStore = await _storeService.CreateStore(store);

        return CreatedAtAction(nameof(GetStore), new { id = newStore.Id }, newStore);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(StoreViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateStore(int id, [FromBody] CreateStoreRequest store)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedStore = await _storeService.UpdateStore(id, store);

        return Ok(updatedStore);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(StoreViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteStore(int id)
    {
        var store = await _storeService.DeleteStore(id);

        if (store == null)
        {
            return NotFound();
        }

        return Ok(store);
    }
}
