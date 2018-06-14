using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wydarzenia.Events.Entities;

namespace Wydarzenia.Events.Dtos
{
    public class NewParticipant
    {
		public Participant Participant { get; set; }
		public int EventId { get; set; }
    }
}
