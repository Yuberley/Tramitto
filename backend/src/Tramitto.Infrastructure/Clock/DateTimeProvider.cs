namespace Tramitto.Infrastructure.Clock;

using Tramitto.Application.Common.Abstractions.Clock;

internal sealed class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}
