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
		public DbSet<Event> Events { get; set; }
		public DbSet<Participant> Participants { get; set; }

		public DataContext(DbContextOptions<DataContext> options): base(options)
		{
			
		}



		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Participant>()
				.HasOne(x => x.Event)
				.WithMany(x => x.Participants)
				.IsRequired();

			base.OnModelCreating(modelBuilder);
		}
	}
}
