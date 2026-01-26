using FinancialControl.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinancialControl.Api.Db;

public interface IFinancialContext
{
    public DbSet<Person> People { get; }
    public DbSet<Category> Categories { get; }
    public DbSet<Transaction> Transactions { get; }
    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
