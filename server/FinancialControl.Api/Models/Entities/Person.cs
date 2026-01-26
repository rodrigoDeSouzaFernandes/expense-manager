namespace FinancialControl.Api.Models.Entities;

public class Person
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public int Age { get; set; }

    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
