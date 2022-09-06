using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Rethink.Patient_Api.CQRS;
using Rethink.Patient_Api.CQRS.Commands;
using Rethink.Patient_Api.CQRS.Queries;
using Rethink.Patient_Api.Domain.Aggregates.Patient;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//CQRS Registrations
builder.Services.TryAddSingleton<IMediator,Mediator>();

builder.Services.AddTransient<ICommandHandler<AddNewPatientCommand, Task<Patient>>,
                AddNewPatientCommandHandler>();

builder.Services.AddTransient<IQueryHandler<GetAllPatientsQuery, Task<List<Patient>>>, GetAllPatientsQueryHandler>();

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
