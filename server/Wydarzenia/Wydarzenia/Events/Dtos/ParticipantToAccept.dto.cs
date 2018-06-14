using Wydarzenia.Account.Entities;
using Wydarzenia.Events.Entities;

namespace Wydarzenia.Events.Dtos
{
    public class ParticipantToAccept
    {
		public Event Event { get; set; }
		public Participant Participant { get; set; }
		public User User { get; set; }
	}
}
