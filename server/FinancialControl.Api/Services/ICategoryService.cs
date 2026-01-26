using FinancialControl.Api.Models.Entities;

namespace FinancialControl.Api.Services;

public interface ICategoryService
{
    Task<Category> CreateCategoryAsync(Category category);
    Task<List<Category>> GetAllCategoriesAsync();
    Task<bool> DeleteCategoryAsync(Guid id);
}
