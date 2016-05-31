using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Chirper.API.Infrastructure;
using Chirper.API.Models;
using System.Web;
using System.Threading.Tasks;

namespace Chirper.API.Controllers
{
    [Authorize]
    public class ChirpsController : ApiController
    {
        private ChirperDataContext db = new ChirperDataContext();

        // GET: api/Chirps
        public List<ReturnChirp> GetChirps()
        {
            List<Chirp> chirps = db.Chirps.ToList();
            
            List<ReturnChirp> returnChirps = new List<ReturnChirp>();

            foreach(Chirp i in chirps)
            {
                ChirpModelFactory chirpFactory = new ChirpModelFactory();
                ReturnChirp newReturnChirp = chirpFactory.ReturnModel(i);
                returnChirps.Add(newReturnChirp);
            }

            return returnChirps;
        }

        // GET: api/Chirps/5
        [ResponseType(typeof(Chirp))]
        public IHttpActionResult GetChirp(int id)
        {
            Chirp chirp = db.Chirps.Find(id);
            if (chirp == null)
            {
                return NotFound();
            }

            return Ok(chirp);
        }

        // PUT: api/Chirps/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutChirp(int id)
        {
            Chirp chirp = db.Chirps.Find(id);

            if (chirp == null)
            {
                return BadRequest();
            }

            chirp.LikeCount++;

            db.Entry(chirp).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChirpExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Chirps
        [ResponseType(typeof(Chirp))]
        public async Task<IHttpActionResult> PostChirp(NewChirpModel chirpModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string name = HttpContext.Current.User.Identity.Name;

            // get the posters id; to be used as the poster UserId of the new chirp.
            User poster;
            
            using (AuthorizationRepository _repo = new AuthorizationRepository())
            {
                poster = await _repo.FindUserByName(name);
            }

            if (poster == null)
            {
                return new UnauthorizedMessage();
            }

            // commit the new chirp to the database
            ChirpModelFactory chirpFactory = new ChirpModelFactory();
            
            Chirp chirp = chirpFactory.InputToDbModel(chirpModel, poster);
            db.Chirps.Add(chirp);
            db.SaveChanges();

            // create a return chirp object
            ReturnChirp returnChirp = chirpFactory.ReturnModel(chirp, poster.UserName);
            
            return CreatedAtRoute("DefaultApi", new { id = chirp.ChirpId }, returnChirp);
        }

        // DELETE: api/Chirps/5
        [ResponseType(typeof(Chirp))]
        public IHttpActionResult DeleteChirp(int id)
        {
            Chirp chirp = db.Chirps.Find(id);
            if (chirp == null)
            {
                return NotFound();
            }

            db.Chirps.Remove(chirp);
            db.SaveChanges();

            return Ok(chirp);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ChirpExists(int id)
        {
            return db.Chirps.Count(e => e.ChirpId == id) > 0;
        }
    }
}