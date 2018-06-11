using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Wydarzenia.Global.Settings;

namespace Wydarzenia.Global.Services
{
	public interface IEmailService
	{
		void SendWelcomeMessage(string email);
		void SendMessage(string email, string subject, string message);
	}

	public class EmailService : IEmailService
	{
		EmailSettings emailSettings;

		public EmailService(IOptions<EmailSettings> emailSettings)
		{
			this.emailSettings = emailSettings.Value;
		}

		public void SendMessage(string email, string subject, string message)
		{
			Execute(email, subject, message).Wait();
		}

		public void SendWelcomeMessage(string email)
		{
			Execute(email,
				"Witaj w aplikacji wydarzenia",
				"Witaj! Mamy nadzieję, że będziesz dobrze bawił się używając naszej aplikacji!").Wait();
		}

		public async Task Execute(string email, string subject, string message)
		{

			MailMessage mail = new MailMessage()
			{
				From = new MailAddress(emailSettings.UsernameEmail, "Tomasz Pawlak")
			};

			mail.To.Add(new MailAddress(email));

			mail.Subject = subject;
			mail.Body = message;
			mail.IsBodyHtml = false;

			using (SmtpClient smtp = new SmtpClient(emailSettings.PrimaryDomain, emailSettings.PrimaryPort))
			{
				smtp.Credentials = new NetworkCredential(emailSettings.UsernameEmail, emailSettings.UsernamePassword);
				smtp.EnableSsl = true;
				await smtp.SendMailAsync(mail);
			}
		}
	}
}
