using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public int UserId { get; set; }

        public List<Review> Reviews { get; set; }
    }
}