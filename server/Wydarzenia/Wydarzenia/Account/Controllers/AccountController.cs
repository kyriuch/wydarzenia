﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Wydarzenia.Account.Dtos;
using Wydarzenia.Account.Services;

namespace Wydarzenia.Account.Controllers
{
	[Route("api/[controller]")]
	public class AccountController : Controller
	{
		IAccountService accountService;

		public AccountController(IAccountService accountService)
		{
			this.accountService = accountService;
		}

		[HttpPost("register")]
		public IActionResult Register([FromBody] UserRegister user)
		{
			if (!ModelState.IsValid)
			{
				string errorMessage;

				if (ModelState.Values.Select(x => x.Errors.Count > 0).ToList().Count > 1)
				{
					errorMessage = "Uzupełnij poprawnie formularz.";
				}
				else
				{
					errorMessage = ModelState.Values.FirstOrDefault().Errors.FirstOrDefault().ErrorMessage;
				}

				return BadRequest(errorMessage);
			}

			try
			{
				return Ok(accountService.CreateAccount(user));
			}
			catch (AppException ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("login")]
		public IActionResult Login([FromBody] UserLogin userLogin)
		{
			if (!ModelState.IsValid)
			{
				if (!ModelState.IsValid)
				{
					string errorMessage;

					if (ModelState.Values.Select(x => x.Errors.Count > 0).ToList().Count > 1)
					{
						errorMessage = "Uzupełnij poprawnie formularz.";
					}
					else
					{
						errorMessage = ModelState.Values.FirstOrDefault().Errors.FirstOrDefault().ErrorMessage;
					}

					return BadRequest(errorMessage);
				}
			}

			try
			{
				return Ok(accountService.Login(userLogin));
			}
			catch (AppException ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("users")]
		public IActionResult GetUsers()
		{
			return Ok(accountService.GetUsers());
		}

		[HttpDelete("deleteusers")]
		public IActionResult DeleteUsers([FromBody] UsersToDelete usersToDelete)
		{
			if (!ModelState.IsValid)
			{
				if (!ModelState.IsValid)
				{
					string errorMessage;

					if (ModelState.Values.Select(x => x.Errors.Count > 0).ToList().Count > 1)
					{
						errorMessage = "Uzupełnij poprawnie formularz.";
					}
					else
					{
						errorMessage = ModelState.Values.FirstOrDefault().Errors.FirstOrDefault().ErrorMessage;
					}

					return BadRequest(errorMessage);
				}
			}

			return Ok(accountService.DeleteUsers(usersToDelete));
		}
	}
}