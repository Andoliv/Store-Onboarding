﻿using System.ComponentModel.DataAnnotations;

namespace Store_Onboarding.Server.ViewModels;

public class CreateProductRequest
{
    [Required(ErrorMessage = "Product Name is required!")]
    [MinLength(3, ErrorMessage = "Product name must be at least 3 characters long!")]
    [StringLength(100, MinimumLength = 3)]
    public string Name { get; set; }

    [Required(ErrorMessage = "Product Price is required!")]
    public decimal Price { get; set; }
}