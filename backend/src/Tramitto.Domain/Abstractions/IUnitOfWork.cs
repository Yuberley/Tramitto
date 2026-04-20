namespace Tramitto.Domain.Abstractions;

/// <summary>
/// Ensures data integrity when multiple database operations are performed in a single transaction.
/// </summary>
public interface IUnitOfWork
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
