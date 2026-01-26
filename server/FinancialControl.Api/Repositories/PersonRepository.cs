using FinancialControl.Api.Db;
using FinancialControl.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinancialControl.Api.Repositories;

public class PersonRepository : IPersonRepository
{
    private readonly FinancialContext _context;

    public PersonRepository(FinancialContext context)
    {
        _context = context;
    }

    public async Task<Person> AddAsync(Person person)
    {
        await _context.People.AddAsync(person);
        await _context.SaveChangesAsync();
        return person;
    }

    public async Task<Person> UpdateAsync(Person person)
    {
        _context.People.Update(person);
        await _context.SaveChangesAsync();
        return person;
    }

    public async Task<Person?> GetByIdAsync(Guid id)
    {
        return await _context.People.FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<IEnumerable<Person>> GetAllAsync()
    {
        return await _context.People.Include(p => p.Transactions).ToListAsync();
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var person = await GetByIdAsync(id);
        if (person != null)
        {
            _context.People.Remove(person);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }
}
