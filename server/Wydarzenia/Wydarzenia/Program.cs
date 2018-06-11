﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Wydarzenia.Account.Services;
using Wydarzenia.Global.Helpers;

namespace Wydarzenia
{
    public class Program
    {
        public static void Main(string[] args)
        {
			var host = BuildWebHost(args);

			using(var scope = host.Services.CreateScope())
			{
				var services = scope.ServiceProvider;
				var context = services.GetRequiredService<DataContext>();
				var accountService = services.GetRequiredService<IAccountService>();

				context.Database.EnsureCreated();

				DataSeeder.SeedDatabase(accountService);
			}

			host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
