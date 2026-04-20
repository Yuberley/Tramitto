namespace Tramitto.Infrastructure.Authentication;

using System.Security.Cryptography;
using Tramitto.Application.Common.Abstractions.Authentication;

internal sealed class HashingService : IHashingService
{
    private const int SaltSize = 16;
    private const int HashSize = 32;
    private const int Iterations = 100000;
    private static readonly HashAlgorithmName Algorithm = HashAlgorithmName.SHA512;

    public string HashPassword(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);
        byte[] hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, HashSize);
        return $"{Convert.ToHexString(hash)}:{Convert.ToHexString(salt)}";
    }

    public bool VerifyPassword(string hashedPassword, string password)
    {
        string[] parts = hashedPassword.Split(':');
        byte[] hash = Convert.FromHexString(parts[0]);
        byte[] salt = Convert.FromHexString(parts[1]);
        byte[] inputHash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, HashSize);
        return CryptographicOperations.FixedTimeEquals(hash, inputHash);
    }
}
