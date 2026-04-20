namespace Tramitto.Application.Common.Abstractions.Data;

using System.Data;

/// <summary>
/// Factory that creates ADO.NET connections for raw SQL (Dapper) queries.
/// </summary>
public interface IDbConnectionFactory
{
    Task<IDbConnection> OpenConnectionAsync(CancellationToken cancellationToken = default);
}
