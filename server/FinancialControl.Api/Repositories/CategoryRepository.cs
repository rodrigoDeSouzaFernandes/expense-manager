using FinancialControl.Api.Db;
using FinancialControl.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinancialControl.Api.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly FinancialContext _context;

    public CategoryRepository(FinancialContext context)
    {
        _context = context;
    }

    public async Task<List<Category>> GetAllAsync()
    {
        return await _context.Categories.ToListAsync();
    }

    public async Task<Category> AddAsync(Category category)
    {
        await _context.Categories.AddAsync(category);
        await _context.SaveChangesAsync();
        return category;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category != null)
        {
            _context.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }
}
