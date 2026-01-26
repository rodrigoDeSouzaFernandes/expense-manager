using FinancialControl.Api.Models.Entities;

namespace FinancialControl.Api.Repositories;

public interface ICategoryRepository
{
    Task<List<Category>> GetAllAsync();
    Task<Category> AddAsync(Category category);
    Task<bool> DeleteAsync(Guid id);
}
