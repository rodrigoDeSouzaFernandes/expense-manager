using FinancialControl.Api.Models.Entities;

namespace FinancialControl.Api.Repositories;

public interface IPersonRepository
{
    Task<Person> AddAsync(Person person);
    Task<Person> UpdateAsync(Person person);
    Task<Person?> GetByIdAsync(Guid id);
    Task<IEnumerable<Person>> GetAllAsync();
    Task DeleteAsync(Guid id);
}
