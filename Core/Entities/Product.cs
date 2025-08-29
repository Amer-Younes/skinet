using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

[Table("Products")]
public class Product : BaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public decimal Price { get; set; }
    public required string PictureUrl { get; set; }

    public required string Type { get; set; }

    public required string Brand { get; set; }

    public int QuantityInStock { get; set; }

}
