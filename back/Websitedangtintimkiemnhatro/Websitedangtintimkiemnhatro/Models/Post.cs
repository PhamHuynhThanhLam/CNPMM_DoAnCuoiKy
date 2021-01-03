using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Websitedangtintimkiemnhatro.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }
        public string Topics { get; set; }
        public DateTime Time { get; set; }
        public string Reply { get; set; }
        public Topic Topic { get; set; }
        [ForeignKey("TopicId")]
        [Required]
        public int TopicId { get; set; }

        public User User { get; set; }
        [ForeignKey("UserId")]
        [Required]
        public int UserId { get; set; }
        
        public Post ParentPost { get; set; }
        public int? ParentPostId { get; set; }
        public ICollection<Post> ChildQuestionPosts { get; set; }
    }
}
