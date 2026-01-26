using FinancialControl.Api.Models.DTOs;
using FinancialControl.Api.Models.Entities;

namespace FinancialControl.Api.Services;

public interface IPersonService
{
    Task<PersonResponseDto> CreatePersonAsync(string name, int age);
    Task<PersonResponseDto> UpdatePersonAsync(Guid id, string name, int age);
    Task<Person?> GetPersonByIdAsync(Guid id);
    Task<IEnumerable<PersonResponseDto>> GetAllPeopleAsync();
    Task DeletePersonAsync(Guid id);
}
