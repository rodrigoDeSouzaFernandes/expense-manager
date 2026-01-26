using FinancialControl.Api.Models.DTOs;
using FinancialControl.Api.Models.Entities;

namespace FinancialControl.Api.Services;

public interface ICategoryService
{
    Task<Category> CreateCategoryAsync(CategoryRequestDto category);
    Task<List<CategoryResponseDto>> GetAllCategoriesAsync();
    Task<bool> DeleteCategoryAsync(Guid id);
}
