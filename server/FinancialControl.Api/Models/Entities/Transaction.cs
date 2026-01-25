using System.ComponentModel.DataAnnotations.Schema;

namespace FinancialControl.Models.Entities;

public class Transaction
{
    public Guid Id { get; set; }

    public decimal Amount { get; set; }
    public DateTime Date { get; set; }

    public string? Description { get; set; }

    public TransactionType Type { get; set; }

    [ForeignKey("Person")]
    public Guid PersonId { get; set; }
    public Person Person { get; set; } = null!;

    [ForeignKey("Category")]
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;
}
