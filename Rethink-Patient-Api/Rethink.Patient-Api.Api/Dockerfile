#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Rethink.Patient-Api.Api/Rethink.Patient-Api.Api.csproj", "Rethink.Patient-Api.Api/"]
COPY ["Rethink.Patient-Api.CQRS/Rethink.Patient-Api.CQRS.csproj", "Rethink.Patient-Api.CQRS/"]
COPY ["Rethink.Patient-Api.Data/Rethink.Patient-Api.Data.csproj", "Rethink.Patient-Api.Data/"]
COPY ["Rethink.Patient-Api.Domain/Rethink.Patient-Api.Domain.csproj", "Rethink.Patient-Api.Domain/"]
RUN dotnet restore "Rethink.Patient-Api.Api/Rethink.Patient-Api.Api.csproj"
COPY . .
WORKDIR "/src/Rethink.Patient-Api.Api"
RUN dotnet build "Rethink.Patient-Api.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Rethink.Patient-Api.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Rethink.Patient-Api.Api.dll"]