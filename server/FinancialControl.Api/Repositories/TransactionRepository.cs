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
        List<Transaction> transactions = await _context.Transactions.ToListAsync();
        return transactions;
    }

    public async Task<Transaction> AddAsync(Transaction transaction)
    {
        await _context.Transactions.AddAsync(transaction);
        await _context.SaveChangesAsync();
        return transaction;
    }

    public async Task<Transaction?> GetByIdAsync(int id)
    {
        return await _context.Transactions.FindAsync(id);
    }
}
