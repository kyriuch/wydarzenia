using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Wydarzenia.Events.Entities
{
	public enum ParticipationType
	{
		Listener = 0,
		Author,
		Sponsor,
		Organizer
	}

	public enum FoodType
	{
		NoPreferences = 0,
		Vegetarian,
		GlutenFree
	}

	public class Participant
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public bool IsParticipantAccepted { get; set; }
		public ParticipationType ParticipationTypeValue { get; set; }
		public FoodType FoodTypeValue { get; set; }
		public Event Event { get; set; }

		[NotMapped]
		private static readonly string[] partTypes = new string[] { "Słuchacz", "Autor", "Sponsor", "Organizator" };

		[NotMapped]
		private static readonly string[] foodTypes = new string[] { "Brak preferencji", "Wegetariańskie", "Bez glutenu" };

		[NotMapped]
		public string ParticipationType
		{
			get { return partTypes[(int)ParticipationTypeValue]; }
			set { ParticipationTypeValue = (ParticipationType)Array.FindIndex(partTypes, x => x == value); }
		}

		[NotMapped]
		public string FoodType
		{
			get { return foodTypes[(int)FoodTypeValue]; }
			set { FoodTypeValue = (FoodType)Array.FindIndex(foodTypes, x => x == value); }
		}
	}
}
