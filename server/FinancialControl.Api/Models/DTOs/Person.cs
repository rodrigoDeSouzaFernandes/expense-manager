using System.ComponentModel.DataAnnotations;
using FinancialControl.Api.Models.Entities;

namespace FinancialControl.Api.Models.DTOs;

public class PersonRequestDto
{
    [Required(ErrorMessage = "Name is required.")]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 50 characters")]
    public string Name { get; set; } = "";

    [Required(ErrorMessage = "Age is required.")]
    [Range(0, 150, ErrorMessage = "Age must be between 0 and 150.")]
    public int Age { get; set; }
}

public class PersonResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = "";
    public int Age { get; set; }
}

public class PersonWithTransactionsResponseDto : PersonResponseDto
{
    public List<TransactionResponseDto> Transactions { get; set; } = new();
}

public class PersonWithBalanceDto : PersonResponseDto
{
    public decimal TotalIncome { get; set; }
    public decimal TotalExpenses { get; set; }
    public decimal Balance { get; set; }
}
