using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using Wydarzenia.Account.Dtos;
using Wydarzenia.Account.Entities;
using Wydarzenia.Global.Helpers;
using Wydarzenia.Global.Services;

namespace Wydarzenia.Account.Services
{
	public interface IAccountService
	{
		UserOut CreateAccount(UserRegister userRegister, bool isAdminAccount = false);
		UserOut Login(UserLogin userLogin);
		ICollection<UserOut> GetUsers();
		ICollection<int> DeleteUsers(int[] usersToDelete);
		ICollection<int> RestartPasswords(int[] usersToHavePasswordRestarted);
	}

	public class AccountService : IAccountService
	{
		DataContext dataContext;
		IMapper mapper;
		IEmailService emailService;

		public AccountService(DataContext dataContext, IMapper mapper, IEmailService emailService)
		{
			this.dataContext = dataContext;
			this.mapper = mapper;
			this.emailService = emailService;
		}

		public UserOut CreateAccount(UserRegister userRegister, bool isAdminAccount = false)
		{
			if (dataContext.Users.Any(x => x.Login == userRegister.Login))
			{
				throw new AppException("Podany login jest zajęty.");
			}

			if (dataContext.Users.Any(x => x.Email == userRegister.Email))
			{
				throw new AppException("Podany email jest zajęty.");
			}

			User user = mapper.Map<User>(userRegister);

			user.Roles = new List<string>();
			user.Roles.Add("User");

			if (isAdminAccount)
				user.Roles.Add("Admin");

			UserOut userOut = mapper.Map<UserOut>(dataContext.Users.Add(user).Entity);
			dataContext.SaveChanges();

			emailService.SendWelcomeMessage(user.Email);

			return userOut;
		}

		public UserOut Login(UserLogin userLogin)
		{
			User user = dataContext.Users.Where(x => x.Login == userLogin.Login).FirstOrDefault();

			if (user == null)
			{
				throw new AppException("Podany użytkownik nie istnieje.");
			}

			if (user.BlockExpirationTime != null && DateTime.Compare(user.BlockExpirationTime, DateTime.Now) > 0)
			{
				throw new AppException("Konto jest zablokowane. Spróbuj ponownie później.");
			}

			if (userLogin.Password != user.Password)
			{
				user.LoginTries++;

				if (user.LoginTries == 3)
				{
					user.BlockExpirationTime = DateTime.Now.AddMinutes(5);
					user.LoginTries = 0;

					dataContext.Update(user);
					dataContext.SaveChanges();

					throw new AppException("Konto zostało zablokowane. Spróbuj ponownie później");
				}

				dataContext.Update(user);
				dataContext.SaveChanges();

				throw new AppException("Nieprawidłowe hasło.");
			}

			user.LoginTries = 0;
			dataContext.Update(user);
			dataContext.SaveChanges();

			return mapper.Map<UserOut>(user);
		}

		public ICollection<UserOut> GetUsers()
		{
			List<UserOut> users = new List<UserOut>();

			dataContext.Users.ToList().ForEach(x => users.Add(mapper.Map<UserOut>(x)));

			return users;
		}

		public ICollection<int> DeleteUsers(int[] ids)
		{
			dataContext.Users.RemoveRange(dataContext.Users.Where(x => ids.Contains(x.Id)));
			dataContext.SaveChanges();

			return ids;
		}

		public ICollection<int> RestartPasswords(int[] usersToHavePasswordRestarted)
		{
			dataContext.Users.
				Where(x => usersToHavePasswordRestarted.Contains(x.Id)).
				ToList().
				ForEach(x =>
				{
					x.Password = "newpassword";
					dataContext.Update(x);
				});

			dataContext.SaveChanges();

			return usersToHavePasswordRestarted;
		}
	}
}
