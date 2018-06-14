using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Wydarzenia.Account.Dtos;
using Wydarzenia.Account.Services;
using Wydarzenia.Global.Helpers;

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
		public IActionResult DeleteUsers(int[] ids)
		{
			return Ok(accountService.DeleteUsers(ids));
		}

		[HttpPatch("restartpasswords")]
		public IActionResult ResetPasswords([FromBody] int[] ids)
		{
			return Ok(accountService.RestartPasswords(ids));
		}
	}
}