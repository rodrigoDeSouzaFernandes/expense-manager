using FinancialControl.Api.Models.DTOs;

namespace FinancialControl.Api.Services;

public interface ITransactionService
{
    Task<List<TransactionResponseDto>> GetTransactionsAsync();
    Task<TransactionResponseDto> AddTransactionAsync(TransactionRequestDto transactionDto);

    Task<TransactionResponseDto> GetTransactionByIdAsync(Guid id);
    Task DeleteTransactionAsync(Guid id);
}
