namespace Tramitto.Application.Common.Abstractions.Authentication;

public interface IHashingService
{
    string HashPassword(string password);
    bool VerifyPassword(string hashedPassword, string password);
}
