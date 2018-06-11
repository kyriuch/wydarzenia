using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wydarzenia.Account.Services;

namespace Wydarzenia.Global.Helpers
{
    public class DataSeeder
    {
		public static void SeedDatabase(IAccountService accountService)
		{
			accountService.CreateAccount(new Account.Dtos.UserRegister
			{
				Email = "kyriuch@gmail.com",
				FirstName = "Tomasz",
				LastName = "Nazwisko",
				Login = "kyriuch",
				Password = "tescik1234"
			}, true);
		}
    }
}
