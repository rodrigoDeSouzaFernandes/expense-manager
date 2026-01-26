using FinancialControl.Api.Models.DTOs;
using FinancialControl.Api.Models.Entities;
using FinancialControl.Api.Repositories;

namespace FinancialControl.Api.Services;

public class PersonService : IPersonService
{
    private readonly IPersonRepository _personRepository;

    public PersonService(IPersonRepository personRepository)
    {
        _personRepository = personRepository;
    }

    public async Task<PersonResponseDto> CreatePersonAsync(string name, int age)
    {
        var person = new Person { Name = name, Age = age };
        var createdPerson = await _personRepository.AddAsync(person);

        PersonResponseDto dto = new PersonResponseDto
        {
            Id = createdPerson.Id,
            Name = createdPerson.Name,
            Age = createdPerson.Age,
        };

        return dto;
    }

    public async Task<PersonResponseDto> UpdatePersonAsync(Guid id, string name, int age)
    {
        var person = await _personRepository.GetByIdAsync(id);
        if (person == null)
        {
            throw new KeyNotFoundException("Person not found");
        }

        person.Name = name;
        var updatedPerson = await _personRepository.UpdateAsync(person);

        PersonResponseDto dto = new PersonResponseDto
        {
            Id = updatedPerson.Id,
            Name = updatedPerson.Name,
            Age = updatedPerson.Age,
        };

        return dto;
    }

    public async Task<Person?> GetPersonByIdAsync(Guid id)
    {
        return await _personRepository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<PersonResponseDto>> GetAllPeopleAsync()
    {
        var people = await _personRepository.GetAllAsync();

        return people.Select(p => new PersonResponseDto
        {
            Id = p.Id,
            Name = p.Name,
            Age = p.Age,
        });
    }

    public async Task DeletePersonAsync(Guid id)
    {
        await _personRepository.DeleteAsync(id);
    }
}
