using FinancialControl.Api.Db;
using FinancialControl.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinancialControl.Api.Repositories;

public class TransactionRepository : ITransactionRepository
{
    private readonly IFinancialContext _context;

    public TransactionRepository(IFinancialContext context)
    {
        _context = context;
    }

    public async Task<List<Transaction>> GetTransactionsAsync()
    {
        List<Transaction> transactions = await _context
            .Transactions.Include(t => t.Person)
            .Include(t => t.Category)
            .ToListAsync();
        return transactions;
    }

    public async Task<Transaction> AddAsync(Transaction transaction)
    {
        await _context.Transactions.AddAsync(transaction);
        await _context.SaveChangesAsync();
        return transaction;
    }

    public async Task<Transaction?> GetTransactionByIdAsync(Guid id)
    {
        return await _context
            .Transactions.Include(t => t.Person)
            .Include(t => t.Category)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var transaction = await GetTransactionByIdAsync(id);
        if (transaction != null)
        {
            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }
}
