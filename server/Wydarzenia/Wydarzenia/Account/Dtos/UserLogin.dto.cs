using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Wydarzenia.Account.Dtos
{
    public class UserLogin
    {
		[Required(ErrorMessage = "Login jest wymagany."),
			MinLength(6, ErrorMessage = "Minimalna długośc loginu 6 znaków."),
			MaxLength(32, ErrorMessage = "Maksymalna długość loginu to 32 znaki.")]
		public string Login { get; set; }
		[Required(ErrorMessage = "Hasło jest wymagane."),
			MinLength(6, ErrorMessage = "Minimalna długośc hasła 6 znaków."),
			MaxLength(32, ErrorMessage = "Maksymalna długość hasła to 32 znaki.")]
		public string Password { get; set; }
    }
}
