using System.Collections.Generic;

namespace Wydarzenia.Account.Dtos
{
    public class UserOut
    {
		public int Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public ICollection<string> Roles { get; set; }
    }
}
