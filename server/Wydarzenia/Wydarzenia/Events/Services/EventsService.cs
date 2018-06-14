using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Wydarzenia.Account.Dtos;
using Wydarzenia.Events.Dtos;
using Wydarzenia.Events.Entities;
using Wydarzenia.Global.Helpers;

namespace Wydarzenia.Events.Services
{
	public interface IEventsService
	{
		void AddNewEvent(NewEvent newEvent);
		ICollection<Event> GetEvents();
		ICollection<UserOut> GetUsers(int eventId);
		Event AddParticipantToEvent(NewParticipant newParticipant);
		ICollection<ParticipantToAccept> GetParticipantsToAccept();
		ParticipantToAccept AcceptParticipant(ParticipantToAccept participantToAccept);
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
				.Include(x => x.Participants)
				.Where(x => x.Id == eventId)
				.FirstOrDefault()
				.Participants;

			return dataContext.Users
				.Where(
					x => participants
					.Where(y => y.UserId == x.Id && y.IsParticipantAccepted)
					.FirstOrDefault() != null
				)
				.Select(x => mapper.Map<UserOut>(x))
				.ToList();
		}

		public Event AddParticipantToEvent([FromBody] NewParticipant newParticipant)
		{
			Event eventToEdit = dataContext.Events
				.Include(x => x.Participants)
				.Where(x => x.Id == newParticipant.EventId)
				.FirstOrDefault();

			if (eventToEdit.Participants.Any(x => x.UserId == newParticipant.Participant.UserId))
			{
				return null;
			}

			eventToEdit.Participants.Add(newParticipant.Participant);
			dataContext.Update(eventToEdit);
			dataContext.SaveChanges();

			return eventToEdit;
		}

		public ICollection<ParticipantToAccept> GetParticipantsToAccept()
		{
			List<ParticipantToAccept> participantsToAccept = new List<ParticipantToAccept>();

			dataContext.Events
				.Include(x => x.Participants)
				.Where(x => x.Participants.Any(y => !y.IsParticipantAccepted))
				.ToList()
				.ForEach(e =>
				{
					e.Participants
					.Where(p => !p.IsParticipantAccepted)
					.ToList().ForEach(p =>
					{
						participantsToAccept.Add(new ParticipantToAccept
						{
							Event = e,
							Participant = p,
							User = dataContext.Users.Where(u => u.Id == p.UserId).FirstOrDefault()
						});
					});
				});

			return participantsToAccept;
		}

		public ParticipantToAccept AcceptParticipant(ParticipantToAccept participantToAccept)
		{
			Event myEvent = dataContext.Events
				.Include(i => i.Participants)
				.Where(x => x.Id == participantToAccept.Event.Id)
				.FirstOrDefault();

			Participant participant = myEvent.Participants.Where(x => x.Id == participantToAccept.Participant.Id).FirstOrDefault();
			participant.IsParticipantAccepted = true;
			participantToAccept.Participant.IsParticipantAccepted = true;
			dataContext.SaveChanges();

			return participantToAccept;
		}
	}
}
