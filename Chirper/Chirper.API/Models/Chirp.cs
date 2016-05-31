using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chirper.API.Models
{
    public class Chirp
    {
        // primary key
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ChirpId { get; set; }

        //fields relevant to chirp
        public string Text { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public int LikeCount { get; set; }

        // relationship keys
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual User User { get; set; }
    }
}