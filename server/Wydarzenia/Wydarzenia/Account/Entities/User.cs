using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Wydarzenia.Account.Entities
{
    public class User
    {
		public int Id { get; set; }
		public string Login { get; set; }
		public string Password { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public int LoginTries { get; set; }
		public DateTime BlockExpirationTime { get; set; }
		public string MappedRoles
		{
			get { return string.Join(",", Roles); }
			set { Roles = value.Split(",").ToList(); }
		}

		[NotMapped]
		public virtual ICollection<string> Roles { get; set; }
    }
}
