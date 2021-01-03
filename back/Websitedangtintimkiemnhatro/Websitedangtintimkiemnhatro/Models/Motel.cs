using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Motel
    {
        [Key]
        public int Id { get; set; }
        public string IdNew { get; set; }
        public string Title { get; set; }
        public string Price { get; set; }
        public string PriceType { get; set; }
        public DateTime DateUpdate { get; set; }
        public DateTime DateDue { get; set; }
        public string Time { get; set; } //Chọn loại thanh toán ngày, tháng ,tuần
        public string Status { get; set; }
        public bool Verify { get; set; }
        public bool VerifyAdmin { get; set; }
        public bool VerifyUser { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public string Phone { get; set; }
        public string Typemotel { get; set; } // Mua bán hay thuê
        public string AreaZone { get; set; }
        public string AreaZoneType { get; set; }
        public string Typeservice { get; set; }
        public City City { get; set; }
        [ForeignKey("CityId")]
        [Required]
        public int CityId { get; set; }
        public Province Province { get; set; }
        [ForeignKey("ProvinceId")]
        [Required]
        public int ProvinceId { get; set; }
        public ICollection<Image> Images { get; set; }
        public Bill Bill { get; set; }
        public User User { get; set; }
        [ForeignKey("UserId")]
        [Required]
        public int UserId { get; set; }
        public Detail Detail { get; set; }

    }
}
