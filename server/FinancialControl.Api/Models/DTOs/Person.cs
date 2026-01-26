namespace FinancialControl.Api.Models.DTOs;

public class PersonRequestDto
{
    public string Name { get; set; } = null!;
    public int Age { get; set; }
}

public class PersonResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public int Age { get; set; }
}
