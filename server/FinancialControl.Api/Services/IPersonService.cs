using FinancialControl.Api.Models.DTOs;
using FinancialControl.Api.Models.Entities;

namespace FinancialControl.Api.Services;

public interface IPersonService
{
    Task<PersonResponseDto> CreatePersonAsync(string name, int age);
    Task<Person?> GetPersonByIdAsync(Guid id);
    Task<IEnumerable<PersonWithBalanceDto>> GetAllPeopleAsync();
    Task DeletePersonAsync(Guid id);
}
