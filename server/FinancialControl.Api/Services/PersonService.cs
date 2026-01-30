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

    public async Task<PersonWithTransactionsResponseDto> GetPersonByIdAsync(Guid id)
    {
        var person = await _personRepository.GetByIdAsync(id);

        if (person == null)
        {
            throw new KeyNotFoundException("Pessoa não encontrada");
        }

        return new PersonWithTransactionsResponseDto
        {
            Id = person.Id,
            Name = person.Name,
            Age = person.Age,
            Transactions = person
                .Transactions.Select(t => new TransactionResponseDto
                {
                    Id = t.Id,
                    Amount = t.Amount,
                    Description = t.Description,
                    Type = t.Type,
                    Date = t.Date,

                    Person = new PersonResponseDto
                    {
                        Id = person.Id,
                        Name = person.Name,
                        Age = person.Age,
                    },

                    Category = new CategoryResponseDto
                    {
                        Id = t.Category.Id,
                        Name = t.Category.Name,
                        Type = t.Category.Type,
                    },
                })
                .ToList(),
        };
    }

    public async Task<IEnumerable<PersonWithBalanceDto>> GetAllPeopleAsync()
    {
        var people = await _personRepository.GetAllAsync();

        return people.Select(p =>
        {
            decimal totalIncome = p
                .Transactions.Where(t => t.Type == TransactionType.Credit)
                .Sum(t => t.Amount);
            decimal totalExpenses = p
                .Transactions.Where(t => t.Type == TransactionType.Debit)
                .Sum(t => t.Amount);

            return new PersonWithBalanceDto
            {
                Id = p.Id,
                Name = p.Name,
                Age = p.Age,
                TotalIncome = totalIncome,
                TotalExpenses = totalExpenses,
                Balance = totalIncome - totalExpenses,
            };
        });
    }

    public async Task DeletePersonAsync(Guid id)
    {
        var deleted = await _personRepository.DeleteAsync(id);

        if (!deleted)
            throw new KeyNotFoundException("Person not found with the provided ID.");
    }
}
