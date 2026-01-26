using FinancialControl.Api.Models.DTOs;
using FinancialControl.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinancialControl.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonController : ControllerBase
{
    private readonly IPersonService _personService;

    public PersonController(IPersonService personService)
    {
        _personService = personService;
    }

    [HttpPost]
    public async Task<IActionResult> CreatePerson([FromBody] PersonRequestDto request)
    {
        var person = await _personService.CreatePersonAsync(request.Name, request.Age);
        return CreatedAtAction(nameof(GetPersonById), new { id = person.Id }, person);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllPeople()
    {
        var people = await _personService.GetAllPeopleAsync();
        return Ok(people);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPersonById(Guid id)
    {
        var person = await _personService.GetPersonByIdAsync(id);
        if (person == null)
            return NotFound();

        return Ok(person);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePerson(Guid id)
    {
        await _personService.DeletePersonAsync(id);
        return NoContent();
    }
}
