using Microsoft.Extensions.DependencyInjection.Extensions;
using Rethink.Patient_Api.CQRS;
using Rethink.Patient_Api.CQRS.Commands;
using Rethink.Patient_Api.CQRS.Queries;
using Rethink.Patient_Api.CQRS.Util;
using Rethink.Patient_Api.Data;
using Rethink.Patient_Api.Domain.Aggregates.Patient;
using Rethink.Patient_Api.Domain.API;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = new ConnectionString(builder.Configuration.GetConnectionString("ApplicationDbContext"));

//Database and mediator services
builder.Services
    .AddSingleton(connectionString)
    .AddSingleton<IApplicationDbContextFactory, DbContextFactory>()
    .TryAddSingleton<IMediator,Mediator>();


//CQRS Handlers
builder.Services
    .AddTransient<ICommandHandler<CreatePatientCommand, Task<Patient>>, CreatePatientCommandHandler>()
    .AddTransient<ICommandHandler<UpdatePatientCommand, Task<Patient>>, UpdatePatientCommandHandler>()
    .AddTransient<ICommandHandler<DeletePatientCommand, Task>, DeletePatientCommandHandler>()
    .AddTransient<ICommandHandler<UploadPatientCsvCommand, Task>, UploadPatientCsvCommandHandler>()
    .AddTransient<IQueryHandler<GetPatientsQuery, Task<Paged<Patient>>>, GetPatientsQueryHandler>();

//automapper config
builder.Services.AddAutoMapper(typeof(PatientUpdateProfile).Assembly);

//CORS
string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
    builder =>
    {
        builder.WithOrigins("https://localhost:4200", "http://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
