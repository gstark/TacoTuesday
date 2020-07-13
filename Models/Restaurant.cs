using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TacoTuesday.Models
{
    public class Restaurant
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public string Address { get; set; }

        public string Telephone { get; set; }

        public int UpvoteCount { get; private set; } = 0;
        public void IncrementUpvoteCount()
        {
            this.UpvoteCount++;
        }

        public int DownvoteCount { get; private set; } = 0;
        public void IncrementDownvoteCount()
        {
            this.DownvoteCount++;
        }

        public int UserId { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public string PhotoURL { get; set; }

        public List<Review> Reviews { get; set; }
    }
}