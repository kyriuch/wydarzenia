﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Wydarzenia.Events.Dtos
{
    public class NewEvent
    {
		[Required(ErrorMessage = "Nazwa wydarzenia jest wymagana.")]
		public string EventName { get; set; }

		[Required(ErrorMessage = "Plan wydarzenia jest wymagany.")]
		public string Agenda { get; set; }

		[Required(ErrorMessage = "Data wydarzenia jest wymagana.")]
		public DateTime Date { get; set; }
    }
}
