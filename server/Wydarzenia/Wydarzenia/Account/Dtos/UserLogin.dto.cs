using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Wydarzenia.Account.Dtos
{
    public class UserLogin
    {
		[Required, MinLength(6), MaxLength(32)]
		public string Login { get; set; }
		[Required, MinLength(6), MaxLength(32)]
		public string Password { get; set; }
    }
}
