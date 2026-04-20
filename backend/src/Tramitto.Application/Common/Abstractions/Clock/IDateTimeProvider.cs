namespace Tramitto.Application.Common.Abstractions.Clock;

public interface IDateTimeProvider
{
    DateTime UtcNow { get; }
}
