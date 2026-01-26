using System.ComponentModel.DataAnnotations;
using FinancialControl.Api.Models.Entities;

namespace FinancialControl.Api.Models.DTOs;

public class TransactionRequestDto
{
    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than zero.")]
    public decimal Amount { get; set; }

    [Required]
    public string? Description { get; set; }

    [Required]
    public TransactionType Type { get; set; }

    [Required]
    public Guid PersonId { get; set; }

    [Required]
    public Guid CategoryId { get; set; }
}

public class TransactionResponseDto
{
    public Guid Id { get; set; }
    public decimal Amount { get; set; }
    public string? Description { get; set; }
    public TransactionType Type { get; set; }
    public PersonResponseDto Person { get; set; } = null!;
    public CategoryResponseDto Category { get; set; } = null!;
    public DateTime Date { get; set; }
}
