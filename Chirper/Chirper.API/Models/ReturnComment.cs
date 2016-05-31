using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Chirper.API.Models
{
    public class ReturnComment
    {
        public string Text { get; set; }
        public DateTime PostDate { get; set; }
    }
}