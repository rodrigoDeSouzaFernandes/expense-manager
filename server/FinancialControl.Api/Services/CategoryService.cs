using FinancialControl.Api.Models.DTOs;
using FinancialControl.Api.Models.Entities;
using FinancialControl.Api.Repositories;

namespace FinancialControl.Api.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<Category> CreateCategoryAsync(CategoryRequestDto categoryDto)
    {
        var category = new Category { Name = categoryDto.Name, Type = categoryDto.Type };

        return await _categoryRepository.AddAsync(category);
    }

    public async Task<List<Category>> GetAllCategoriesAsync()
    {
        return await _categoryRepository.GetAllAsync();
    }

    public async Task<bool> DeleteCategoryAsync(Guid id)
    {
        return await _categoryRepository.DeleteAsync(id);
    }
}
