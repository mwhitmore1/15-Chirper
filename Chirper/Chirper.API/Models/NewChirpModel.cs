using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Chirper.API.Models
{
    public class NewChirpModel
    {
        //fields relevant to chirp
        [Required]
        [Display(Name = "Chirp text")]
        [StringLength(240, ErrorMessage = "{0} can have a max length of {1} characters.")]
        public string Text { get; set; }
    }
}