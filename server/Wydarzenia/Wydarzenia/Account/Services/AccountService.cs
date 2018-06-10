using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Wydarzenia.Account.Dtos;
using Wydarzenia.Account.Entities;

namespace Wydarzenia.Account.Services
{
	public interface IAccountService
	{
		UserOut CreateAccount(UserRegister userRegister);
		UserOut Login(UserLogin userLogin);
	}

	public class AccountService : IAccountService
	{
		DataContext dataContext;
		IMapper mapper;

		public AccountService(DataContext dataContext, IMapper mapper)
		{
			this.dataContext = dataContext;
			this.mapper = mapper;
		}

		public UserOut CreateAccount(UserRegister userRegister)
		{
			if(dataContext.Users.Any(x => x.Login == userRegister.Login))
			{
				throw new AppException("Podany login jest zajęty");
			}

			if (dataContext.Users.Any(x => x.Email == userRegister.Email))
			{
				throw new AppException("Podany email jest zajęty");
			}

			User user = mapper.Map<User>(userRegister);

			user.Roles = new List<string>();
			user.Roles.Add("User");

			UserOut userOut = mapper.Map<UserOut>(dataContext.Users.Add(user).Entity);
			dataContext.SaveChanges();

			return userOut;
		}

		public UserOut Login(UserLogin userLogin)
		{
			User user = dataContext.Users.Where(x => x.Login == userLogin.Login && x.Password == userLogin.Password).FirstOrDefault();

			if (user == null)
			{
				throw new AppException("Konto nie istnieje");
			}

			return mapper.Map<UserOut>(user);
		}
	}
}
