namespace Tramitto.Application.Common.Abstractions.Authentication;

public interface IUserContext
{
    Guid UserId { get; }
    string Role { get; }
}
