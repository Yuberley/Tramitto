namespace Tramitto.Domain.Abstractions;

using System.Linq.Expressions;

/// <summary>
/// Defines the general methods of a repository.
/// </summary>
/// <typeparam name="T">Entity type.</typeparam>
public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IEnumerable<T>> GetByIdsAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken = default);
    Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default);
    void Add(T entity);
    void AddMany(IEnumerable<T> entities);
    void Update(T entity);
    bool Delete(T entity);
    bool SoftDelete(T entity);
}
