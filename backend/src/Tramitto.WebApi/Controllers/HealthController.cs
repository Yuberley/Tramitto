namespace Tramitto.WebApi.Controllers;

using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

[ApiController]
[ApiVersion(1)]
[Route("api/v{version:apiVersion}/[controller]")]
public sealed class HealthController : ControllerBase
{
    /// <summary>
    /// Returns the current health status of the API.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(HealthResponse), StatusCodes.Status200OK)]
    public IActionResult Get()
    {
        var version = Assembly
            .GetExecutingAssembly()
            .GetName()
            .Version?
            .ToString() ?? "1.0.0";

        return Ok(new HealthResponse(
            Status: "Healthy",
            Version: version,
            Timestamp: DateTime.UtcNow,
            Service: "Tramitto API"
        ));
    }
}

public sealed record HealthResponse(
    string Status,
    string Version,
    DateTime Timestamp,
    string Service
);
