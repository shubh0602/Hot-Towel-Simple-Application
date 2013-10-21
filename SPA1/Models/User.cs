using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SPA1.Models
{
    public class User
    {
        public int Id { get; set; }
        public string First { get; set; }
        public string Last { get; set; }
        public string DOB { get; set; }
        public string Sex { get; set; }
        public string Others { get; set; }
    }
}