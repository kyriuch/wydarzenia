using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wydarzenia.Account;
using Wydarzenia.Account.Dtos;
using Wydarzenia.Events.Dtos;
using Wydarzenia.Events.Entities;

namespace Wydarzenia.Events.Services
{
	public interface IEventsService
	{
		void AddNewEvent(NewEvent newEvent);
		ICollection<Event> GetEvents();
		ICollection<UserOut> GetUsers(int eventId);
		void AddParticipantToEvent(NewParticipant newParticipant);
	}

	public class EventsService : IEventsService
	{
		DataContext dataContext;
		IMapper mapper;

		public EventsService(DataContext dataContext, IMapper mapper)
		{
			this.dataContext = dataContext;
			this.mapper = mapper;
		}

		public void AddNewEvent(NewEvent newEvent)
		{
			Event myEvent = mapper.Map<Event>(newEvent);
			myEvent.Participants = new List<Participant>();
			dataContext.Events.Add(myEvent);
			dataContext.SaveChanges();
		}

		public ICollection<Event> GetEvents()
		{
			return dataContext.Events.ToList();
		}

		public ICollection<UserOut> GetUsers(int eventId)
		{
			ICollection<Participant> participants = dataContext.Events
				.Where(x => x.Id == eventId)
				.FirstOrDefault()
				.Participants;

			List<Participant> properParticipants;

			if (participants == null)
				properParticipants = new List<Participant>();
			else
				properParticipants = participants.ToList();

			return dataContext.Users
				.Where(
					x => properParticipants
					.Where(y => y.UserId == x.Id && y.IsParticipantAccepted)
					.FirstOrDefault() != null
				)
				.Select(x => mapper.Map<UserOut>(x))
				.ToList();
		}

		public void AddParticipantToEvent([FromBody] NewParticipant newParticipant)
		{
			Event eventToEdit = dataContext.Events
				.Where(x => x.Id == newParticipant.EventId)
				.FirstOrDefault();

			if (eventToEdit.Participants == null)
				eventToEdit.Participants = new List<Participant>();

			if (eventToEdit.Participants.Any(x => x.UserId == newParticipant.Participant.UserId))
				throw new AppException("Jesteś zapisany już na to wydarzenie.");

			eventToEdit.Participants.Add(newParticipant.Participant);
			dataContext.Update(eventToEdit);
			dataContext.SaveChanges();
		}
	}
}
