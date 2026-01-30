using FinancialControl.Api.Models.DTOs;
using FinancialControl.Api.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly ITransactionService _transactionService;

    public TransactionsController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    [HttpGet]
    public async Task<ActionResult<List<TransactionResponseDto>>> GetTransactions()
    {
        var transactions = await _transactionService.GetTransactionsAsync();
        return Ok(transactions);
    }

    [HttpPost]
    public async Task<ActionResult<TransactionResponseDto>> AddTransaction(
        [FromBody] TransactionRequestDto transactionDto
    )
    {
        var createdTransaction = await _transactionService.AddTransactionAsync(transactionDto);
        return CreatedAtAction(
            nameof(GetTransactionById),
            new { id = createdTransaction.Id },
            createdTransaction
        );
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TransactionResponseDto>> GetTransactionById(Guid id)
    {
        var transaction = await _transactionService.GetTransactionByIdAsync(id);
        return Ok(transaction);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTransaction(Guid id)
    {
        await _transactionService.DeleteTransactionAsync(id);
        return NoContent();
    }
}
