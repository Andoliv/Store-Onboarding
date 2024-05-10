﻿using System.ComponentModel.DataAnnotations;

namespace Store_Onboarding.Server.ViewModels;

public class CustomerViewModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public DateTime Created { get; set; }
    public DateTime Updated { get; set; }

}
