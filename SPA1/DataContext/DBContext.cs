using SPA1.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SPA1.DataContext
{
    public class DataAccess : DbContext
    {
        public DbSet<User> Users { get; set; }

    }
}