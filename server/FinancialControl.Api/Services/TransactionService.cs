using FinancialControl.Api.Models.DTOs;
using FinancialControl.Api.Models.Entities;
using FinancialControl.Api.Repositories;

namespace FinancialControl.Api.Services;

public class TransactionService
{
    private readonly ITransactionRepository _transactionRepository;

    public TransactionService(ITransactionRepository transactionRepository)
    {
        _transactionRepository = transactionRepository;
    }

    public async Task<List<TransactionResponseDto>> GetTransactionsAsync()
    {
        var transactions = await _transactionRepository.GetTransactionsAsync();

        return transactions
            .Select(t => new TransactionResponseDto
            {
                Id = t.Id,
                Amount = t.Amount,
                Description = t.Description,
                Type = t.Type,
                Person = new PersonResponseDto
                {
                    Id = t.Person.Id,
                    Name = t.Person.Name,
                    Age = t.Person.Age,
                },
                Category = new CategoryResponseDto
                {
                    Id = t.Category.Id,
                    Name = t.Category.Name,
                    Type = t.Category.Type,
                },
                Date = t.Date,
            })
            .ToList();
    }

    public async Task<TransactionResponseDto> AddTransactionAsync(
        TransactionRequestDto transactionDto
    )
    {
        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            Amount = transactionDto.Amount,
            Description = transactionDto.Description,
            Type = transactionDto.Type,
            PersonId = transactionDto.PersonId,
            CategoryId = transactionDto.CategoryId,
            Date = DateTime.UtcNow,
        };

        await _transactionRepository.AddAsync(transaction);

        var createdTransaction = await _transactionRepository.GetTransactionByIdAsync(
            transaction.Id
        );

        if (createdTransaction == null)
        {
            throw new Exception("Failed to create transaction, try again later.");
        }

        return new TransactionResponseDto
        {
            Id = createdTransaction.Id,
            Amount = createdTransaction.Amount,
            Description = createdTransaction.Description,
            Type = createdTransaction.Type,
            Person = new PersonResponseDto
            {
                Id = createdTransaction.Person.Id,
                Name = createdTransaction.Person.Name,
                Age = createdTransaction.Person.Age,
            },
            Category = new CategoryResponseDto
            {
                Id = createdTransaction.Category.Id,
                Name = createdTransaction.Category.Name,
                Type = createdTransaction.Category.Type,
            },
            Date = createdTransaction.Date,
        };
    }

    public async Task<TransactionResponseDto> GetTransactionByIdAsync(Guid id)
    {
        var transaction = await _transactionRepository.GetTransactionByIdAsync(id);

        if (transaction == null)
        {
            throw new KeyNotFoundException("Transaction not found");
        }

        return new TransactionResponseDto
        {
            Id = transaction.Id,
            Amount = transaction.Amount,
            Description = transaction.Description,
            Type = transaction.Type,
            Person = new PersonResponseDto
            {
                Id = transaction.Person.Id,
                Name = transaction.Person.Name,
                Age = transaction.Person.Age,
            },
            Category = new CategoryResponseDto
            {
                Id = transaction.Category.Id,
                Name = transaction.Category.Name,
                Type = transaction.Category.Type,
            },
            Date = transaction.Date,
        };
    }

    public async Task DeleteTransactionAsync(Guid id)
    {
        var deleted = await _transactionRepository.DeleteAsync(id);

        if (!deleted)
        {
            throw new KeyNotFoundException("Transaction not found");
        }
    }
}
