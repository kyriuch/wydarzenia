using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wydarzenia.Account.Entities;

namespace Wydarzenia
{
    public class DataContext : DbContext
    {
		public DbSet<User> Users { get; set; }

		public DataContext(DbContextOptions<DataContext> options): base(options)
		{

		}
    }
}
