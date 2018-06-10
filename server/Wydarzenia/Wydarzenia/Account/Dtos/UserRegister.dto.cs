
using System.ComponentModel.DataAnnotations;

namespace Wydarzenia.Account.Dtos
{


    public class UserRegister
    {
		[Required(ErrorMessage = "Login jest wymagany."),
			MinLength(6, ErrorMessage = "Minimalna długośc loginu 6 znaków."),
			MaxLength(32, ErrorMessage = "Maksymalna długość loginu to 32 znaki.")]
		public string Login { get; set; }
		[Required(ErrorMessage = "Hasło jest wymagane."),
			MinLength(6, ErrorMessage = "Minimalna długośc hasła 6 znaków."),
			MaxLength(32, ErrorMessage = "Maksymalna długość hasła to 32 znaki.")]
		public string Password { get; set; }
		[Required(ErrorMessage = "Imię jest wymagane."),
			MinLength(2, ErrorMessage = "Minimalna długość imienia to 2 znaki.")]
		public string FirstName { get; set; }
		[Required(ErrorMessage = "Nazwisko jest wymagane"),
			MinLength(2, ErrorMessage = "Minimalna długość nazwiska to 2 znaki.")]
		public string LastName { get; set; }
		[Required(ErrorMessage = "Email jest wymagany."),
			EmailAddress(ErrorMessage = "Niepoprawny adres email.")]
		public string Email { get; set; }
    }
}
