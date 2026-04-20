namespace Tramitto.Application.Common.Abstractions.Data;

/// <summary>
/// Abstraction over ApplicationDbContext for use in Application layer read projections (Dapper/EF raw queries).
/// Intentionally exposes only the DbSets needed for cross-aggregate queries.
/// DbSets will be added here as domain entities are created.
/// </summary>
public interface IApplicationDbContext
{
    // DbSets are added here as domain entities are created.
    // Example: DbSet<User> Users { get; }
}
