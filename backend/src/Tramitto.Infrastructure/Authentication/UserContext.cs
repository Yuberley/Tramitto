namespace Tramitto.Infrastructure.Authentication;

using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Tramitto.Application.Common.Abstractions.Authentication;

internal sealed class UserContext : IUserContext
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserContext(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid UserId =>
        _httpContextAccessor.HttpContext?.User
            .FindFirstValue(ClaimTypes.NameIdentifier) is string id
            ? Guid.Parse(id)
            : throw new InvalidOperationException("User context is not available.");

    public string Role =>
        _httpContextAccessor.HttpContext?.User
            .FindFirstValue(ClaimTypes.Role)
            ?? throw new InvalidOperationException("User context is not available.");
}
