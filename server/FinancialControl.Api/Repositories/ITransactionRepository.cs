using FinancialControl.Api.Models.Entities;

namespace FinancialControl.Api.Repositories;

public interface ITransactionRepository
{
    Task<List<Transaction>> GetTransactionsAsync();

    Task<Transaction> AddAsync(Transaction transaction);
    Task<Transaction?> GetTransactionByIdAsync(Guid id);
    Task<bool> DeleteAsync(Guid id);
}
