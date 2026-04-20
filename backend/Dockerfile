# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["src/Tramitto.WebApi/Tramitto.WebApi.csproj", "src/Tramitto.WebApi/"]
COPY ["src/Tramitto.Application/Tramitto.Application.csproj", "src/Tramitto.Application/"]
COPY ["src/Tramitto.Domain/Tramitto.Domain.csproj", "src/Tramitto.Domain/"]
COPY ["src/Tramitto.Infrastructure/Tramitto.Infrastructure.csproj", "src/Tramitto.Infrastructure/"]

RUN dotnet restore "src/Tramitto.WebApi/Tramitto.WebApi.csproj"

COPY . .

RUN dotnet publish "src/Tramitto.WebApi/Tramitto.WebApi.csproj" \
    -c Release \
    -o /app/publish \
    --no-restore

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

EXPOSE 8080
EXPOSE 8081

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Tramitto.WebApi.dll"]
