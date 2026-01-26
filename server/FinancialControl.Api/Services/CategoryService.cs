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

    public async Task<List<CategoryResponseDto>> GetAllCategoriesAsync()
    {
        var categories = await _categoryRepository.GetAllAsync();
        List<CategoryResponseDto> response = categories
            .Select(c => new CategoryResponseDto
            {
                Id = c.Id,
                Name = c.Name,
                Type = c.Type,
            })
            .ToList();
        return response;
    }

    public async Task DeleteCategoryAsync(Guid id)
    {
        var deleted = await _categoryRepository.DeleteAsync(id);

        if (!deleted)
            throw new KeyNotFoundException("Category not found with the provided ID.");
    }
}
