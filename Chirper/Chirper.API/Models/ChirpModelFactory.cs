using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Chirper.API.Infrastructure;

namespace Chirper.API.Models
{
    public class ChirpModelFactory
    {
        public Chirp InputToDbModel(NewChirpModel model, User poster)
        {
            return new Chirp()
            {
                UserId = poster.Id,
                Text = model.Text,
                CreatedDate = DateTime.Now,
                LikeCount = 0
            };
        }

        public ReturnChirp ReturnModel (Chirp chirp, string poster)
        {
            return new ReturnChirp()
            {
                Text = chirp.Text,
                UserName = poster,
                CreatedDate = chirp.CreatedDate,
                LikeCount = chirp.LikeCount
            };
        }

        public ReturnChirp ReturnModel(Chirp chirp)
        {
            return new ReturnChirp()
            {
                ChirpId = chirp.ChirpId,
                Text = chirp.Text,
                UserName = chirp.User.UserName,
                CreatedDate = chirp.CreatedDate,
                LikeCount = chirp.LikeCount
            };
        }
    }
}