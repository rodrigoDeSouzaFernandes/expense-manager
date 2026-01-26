using System.ComponentModel.DataAnnotations;

namespace FinancialControl.Api.Models.DTOs;

public class CategoryRequestDto
{
    [Required(ErrorMessage = "Category name is required.")]
    public string Name { get; set; } = "";

    [Required(ErrorMessage = "Category type is required.")]
    public CategoryType Type { get; set; }
};

public class CategoryResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public CategoryType Type { get; set; }
}
