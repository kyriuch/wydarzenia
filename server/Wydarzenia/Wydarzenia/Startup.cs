using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Wydarzenia.Account.Services;
using Wydarzenia.Global.Services;
using Wydarzenia.Global.Settings;

namespace Wydarzenia
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			// configure .net core
			services.AddDbContext<DataContext>(opt => opt.UseInMemoryDatabase("DataContext"));
			services.AddAutoMapper();
			services.AddMvc();
			services.AddCors();

			// configure Email
			services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));

			// configure DI Container
			services.AddScoped<IAccountService, AccountService>();
			services.AddScoped<IEmailService, EmailService>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseCors(builder => builder
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowAnyOrigin()
			.AllowCredentials());
			app.UseMvc();
		}
	}
}
