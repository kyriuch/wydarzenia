﻿using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Wydarzenia.Events.Dtos;
using Wydarzenia.Events.Entities;
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
			Event myEvent = eventsService.AddParticipantToEvent(newParticipant);

			if(myEvent == null)
			{
				return BadRequest("Coś poszło nie tak. Upewnij się, że nie jesteś już zapisany na to wydarzenie.");
			}

			return Ok();
		}

		[HttpGet("participantstoaccept")]
		public IActionResult GetParticipantsToAccept()
		{
			return Ok(eventsService.GetParticipantsToAccept());
		}

		[HttpPost("acceptparticipant")]
		public IActionResult AcceptParticipant([FromBody] ParticipantToAccept participantToAccept)
		{
			return Ok(eventsService.AcceptParticipant(participantToAccept));
		}
    }
}
