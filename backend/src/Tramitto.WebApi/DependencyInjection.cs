namespace Tramitto.WebApi;

using Asp.Versioning;
using Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services)
    {
        services.AddControllers();

        services.AddApiVersioning(options =>
        {
            options.DefaultApiVersion = new ApiVersion(1);
            options.ReportApiVersions = true;
            options.ApiVersionReader = new UrlSegmentApiVersionReader();
        })
        .AddApiExplorer(options =>
        {
            options.GroupNameFormat = "'v'V";
            options.SubstituteApiVersionInUrl = true;
        });

        // Native .NET OpenAPI document generation
        services.AddOpenApi(options =>
        {
            options.AddDocumentTransformer((document, context, ct) =>
            {
                document.Info.Title = "Tramitto API";
                document.Info.Version = "v1";
                document.Info.Description = "Plataforma de mandados y trámites bajo demanda — Cumaral, Meta, Colombia";
                return Task.CompletedTask;
            });
        });

        return services;
    }
}
