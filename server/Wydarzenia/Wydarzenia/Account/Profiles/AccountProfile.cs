using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wydarzenia.Account.Dtos;
using Wydarzenia.Account.Entities;

namespace Wydarzenia.Account.Profiles
{
    public class AccountProfile : Profile
    {
		public AccountProfile()
		{
			CreateMap<UserRegister, User>();
			CreateMap<User, UserOut>();
			CreateMap<List<User>, List<UserOut>>();
		}
    }
}
