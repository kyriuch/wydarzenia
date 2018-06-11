
using System;
using System.Collections.Generic;

namespace Wydarzenia.Events.Entities
{
    public class Event
    {
		public int Id { get; set; }
		public string EventName { get; set; }
		public string Agenda { get; set; }
		public DateTime Date { get; set; }
		public ICollection<Participant> Participants { get; set; }
	}
}
