public class Transaction
{
    public Guid Id { get; set; }

    public decimal Amount { get; set; }
    public DateTime Date { get; set; }

    public string? Description { get; set; }

    public TransactionType Type { get; set; }

    public Guid UserId { get; set; }
    public User User { get; set; } = null!;

    public Guid PersonId { get; set; }
    public Person Person { get; set; } = null!;

    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;
}
