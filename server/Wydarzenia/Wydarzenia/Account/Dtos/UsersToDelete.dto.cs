using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Wydarzenia.Account.Dtos
{
	public class UsersToDelete
	{
		[Required(ErrorMessage = "Lista użytkowników jest wymagana."),
			MinLength(1, ErrorMessage = "Musisz wybrać przynajmniej jedno konto.")]
		public ICollection<int> UsersIds { get; set; }
	}
}
