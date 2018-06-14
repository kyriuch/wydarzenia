using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wydarzenia.Events.Dtos;
using Wydarzenia.Events.Services;

namespace Wydarzenia.Events.Controllers
{
	[Route("api/[controller]")]
    public class EventController : Controller
    {
		IEventsService eventsService;

		public EventController(IEventsService eventsService)
		{
			this.eventsService = eventsService;
		}

		[HttpPost("add")]
        public IActionResult AddNewEvent([FromBody] NewEvent newEvent)
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

			eventsService.AddNewEvent(newEvent);

			return Ok();
		}

		[HttpGet("events")]
		public IActionResult GetEvents()
		{
			return Ok(eventsService.GetEvents());
		}

		[HttpGet("users/{id}")]
		public IActionResult GetUsers(int id)
		{
			return Ok(eventsService.GetUsers(id));
		}

		[HttpPost("addparticipant")]
		public IActionResult AddParticipant([FromBody] NewParticipant newParticipant)
		{
			eventsService.AddParticipantToEvent(newParticipant);

			return Ok();
		}
    }
}
