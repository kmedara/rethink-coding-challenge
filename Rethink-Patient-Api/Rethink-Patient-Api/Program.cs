using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Rethink.Patient_Api.CQRS;
using Rethink.Patient_Api.CQRS.Commands;
using Rethink.Patient_Api.CQRS.Queries;
using Rethink.Patient_Api.Data;
using Rethink.Patient_Api.Domain.Aggregates.Patient;
using System.Net;
using Microsoft.Extensions.Configuration;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = new ConnectionString(
                builder.Configuration.GetConnectionString("ApplicationDbContext")
                );

//Database and mediator services
builder.Services
    .AddSingleton(connectionString)
    .AddSingleton<DbContextFactory>()
    .TryAddSingleton<IMediator,Mediator>();


//CQRS Handlers
builder.Services
    .AddTransient<ICommandHandler<CreatePatientCommand, Task<Patient>>, CreatePatientCommandHandler>()
    .AddTransient<IQueryHandler<GetPatientsQuery, Task<List<Patient>>>, GetPatientsQueryHandler>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
