namespace Tramitto.Infrastructure.Database;

using Microsoft.EntityFrameworkCore;
using Tramitto.Application.Common.Abstractions.Clock;
using Tramitto.Application.Common.Abstractions.Data;
using Tramitto.Application.Common.Exceptions;
using Tramitto.Domain.Abstractions;

public class ApplicationDbContext : DbContext, IUnitOfWork, IApplicationDbContext
{
    private readonly IDateTimeProvider _dateTimeProvider;

    // DbSets will be added here as domain entities are created
    // Example: public DbSet<User> Users { get; set; }

    public ApplicationDbContext(DbContextOptions options, IDateTimeProvider dateTimeProvider)
        : base(options)
    {
        _dateTimeProvider = dateTimeProvider;
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            return await base.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateConcurrencyException ex)
        {
            throw new ConcurrencyException("Concurrency exception occurred.", ex);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}
