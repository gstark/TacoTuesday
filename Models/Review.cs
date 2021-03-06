using System;

namespace TacoTuesday.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Summary { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; private set; } = DateTime.Now;
        public int RestaurantId { get; set; }
        public int UserId { get; set; }
    }
}