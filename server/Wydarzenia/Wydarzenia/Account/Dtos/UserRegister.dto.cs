
using System.ComponentModel.DataAnnotations;

namespace Wydarzenia.Account.Dtos
{


    public class UserRegister
    {
		[Required(ErrorMessage = "Pole loginu jest wymagane."),
			MinLength(6, ErrorMessage = "Minimalna długośc loginu 6 znaków."),
			MaxLength(32, ErrorMessage = "Maksymalna długość loginu to 32 znaki.")]
		public string Login { get; set; }
		[Required(ErrorMessage = "Pole hasła jest wymagane."),
			MinLength(6, ErrorMessage = "Minimalna długośc hasła 6 znaków."),
			MaxLength(32, ErrorMessage = "Maksymalna długość hasła to 32 znaki.")]
		public string Password { get; set; }
		[Required, MinLength(2)]
		public string FirstName { get; set; }
		[Required, MinLength(2)]
		public string LastName { get; set; }
		[Required, EmailAddress]
		public string Email { get; set; }
    }
}
