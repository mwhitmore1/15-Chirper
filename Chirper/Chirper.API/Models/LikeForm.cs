using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Chirper.API.Models
{
    public class LikeForm
    {
        [Required]
        public int ChirpId { get; set; }
    }
}