namespace Tramitto.Application.Common.Abstractions.Authentication;

/// <summary>
/// Generates and decodes JWT tokens for authenticated users.
/// </summary>
public interface IJwtProvider
{
    string GenerateToken(Guid userId, string email, string role);
}
