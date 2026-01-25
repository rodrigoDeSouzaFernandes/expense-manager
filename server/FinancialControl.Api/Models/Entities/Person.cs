namespace FinancialControl.Models.Entities;

public class Person
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
