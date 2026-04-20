namespace Tramitto.Infrastructure;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Minio;
using Tramitto.Application.Common.Abstractions.Authentication;
using Tramitto.Application.Common.Abstractions.Clock;
using Tramitto.Application.Common.Abstractions.Data;
using Tramitto.Domain.Abstractions;
using Tramitto.Infrastructure.Authentication;
using Tramitto.Infrastructure.Clock;
using Tramitto.Infrastructure.Database;

public static class DependencyInjection
{
    private const string PostgresConnectionString = "PostgresConnection";
    private const string POSTGRES_CONNECTION_ENV = "POSTGRES_CONNECTION";

    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddTransient<IDateTimeProvider, DateTimeProvider>();

        AddPersistence(services, configuration);
        AddAuthentication(services, configuration);
        AddCors(services, configuration);

        return services;
    }

    private static void AddPersistence(
        IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString =
            Environment.GetEnvironmentVariable(POSTGRES_CONNECTION_ENV)
            ?? configuration.GetConnectionString(PostgresConnectionString)
            ?? throw new InvalidOperationException("PostgreSQL connection string is not configured.");

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(connectionString).UseSnakeCaseNamingConvention());

        services.AddScoped<IUnitOfWork>(sp => sp.GetRequiredService<ApplicationDbContext>());
        services.AddScoped<IApplicationDbContext>(sp => sp.GetRequiredService<ApplicationDbContext>());

        services.AddSingleton<IDbConnectionFactory>(_ => new DbConnectionFactory(connectionString));
    }

    private static void AddAuthentication(
        IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddHttpContextAccessor();
        services.AddTransient<IJwtProvider, JwtProvider>();
        services.AddTransient<IHashingService, HashingService>();
        services.AddScoped<IUserContext, UserContext>();

        services.Configure<JwtOptions>(configuration.GetSection(JwtOptions.SectionName));
    }

    private static void AddCors(IServiceCollection services, IConfiguration configuration)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", policy => policy
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
        });
    }
}
