
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

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
