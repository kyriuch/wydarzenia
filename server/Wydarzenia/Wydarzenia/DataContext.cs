using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wydarzenia.Account.Entities;
using Wydarzenia.Events.Entities;

namespace Wydarzenia
{
    public class DataContext : DbContext
    {
		public DbSet<User> Users { get; set; }
		public virtual DbSet<Event> Events { get; set; }

		public DataContext(DbContextOptions<DataContext> options): base(options)
		{
			
		}



		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
		}
	}
}
