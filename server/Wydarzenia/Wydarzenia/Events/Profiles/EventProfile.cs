using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wydarzenia.Events.Dtos;
using Wydarzenia.Events.Entities;

namespace Wydarzenia.Events.Profiles
{
    public class EventProfile : Profile
    {
		public EventProfile()
		{
			CreateMap<NewEvent, Event>();
		}
    }
}
