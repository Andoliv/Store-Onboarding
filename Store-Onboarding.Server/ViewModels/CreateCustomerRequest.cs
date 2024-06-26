﻿using System.ComponentModel.DataAnnotations;

namespace Store_Onboarding.Server.ViewModels;

public class CreateCustomerRequest
{
    [Required(ErrorMessage = "Customer Name is required!")]
    [MinLength(3, ErrorMessage = "Customer name must be at least 3 characters long!")]
    [StringLength(100, MinimumLength = 3)]
    public required string Name { get; set; }

    [Required(ErrorMessage = "Customer Address is required!")]
    [StringLength(300)]
    public required string Address { get; set; }
}
