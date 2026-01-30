using FinancialControl.Api.Exceptions;
using FinancialControl.Api.Models.DTOs;
using FinancialControl.Api.Models.Entities;
using FinancialControl.Api.Repositories;
using Microsoft.EntityFrameworkCore;

namespace FinancialControl.Api.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<CategoryResponseDto> CreateCategoryAsync(CategoryRequestDto categoryDto)
    {
        var category = new Category { Name = categoryDto.Name, Type = categoryDto.Type };

        var createdCategory = await _categoryRepository.AddAsync(category);

        return new CategoryResponseDto
        {
            Id = createdCategory.Id,
            Name = createdCategory.Name,
            Type = createdCategory.Type,
        };
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
        try
        {
            var deleted = await _categoryRepository.DeleteAsync(id);

            if (!deleted)
                throw new KeyNotFoundException("Categoria não encontrada com o ID informado.");
        }
        catch (DbUpdateException)
        {
            throw new BusinessRuleException(
                "Não é possível excluir a categoria porque existem transações vinculadas a ela."
            );
        }
    }
}
