using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> Register([FromBody] UserRegister user)
		{
			if(!ModelState.IsValid)
			{
				return BadRequest(ModelState.ValidationState);
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
		public async Task<IActionResult> Login([FromBody] UserLogin userLogin)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState.Values);
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
    }
}