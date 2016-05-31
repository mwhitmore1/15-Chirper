using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Chirper.API.Models
{
    public class Comment
    {
        // primary key
        public string UserId { get; set; }

        // comment properties
        public int CommentId { get; set; }
        public int ChirpId { get; set; }
        public string Text { get; set; }
        public DateTime PostDate { get; set; }

        // relationship keys
        public virtual Chirp Chirp { get; set; }
        public virtual User User { get; set; }
    }
}