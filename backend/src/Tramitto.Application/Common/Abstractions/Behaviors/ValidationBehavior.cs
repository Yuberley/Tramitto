namespace Tramitto.Application.Common.Abstractions.Behaviors;

using FluentValidation;
using MediatR;
using Tramitto.Application.Common.Abstractions.CQRS;
using Tramitto.Application.Common.Exceptions;

internal sealed class ValidationBehavior<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IBaseCommand
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
    {
        _validators = validators;
    }

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (!_validators.Any())
            return await next();

        var context = new ValidationContext<TRequest>(request);

        var validationErrors = _validators
            .Select(validator => validator.Validate(context))
            .Where(result => result.Errors.Any())
            .SelectMany(result => result.Errors)
            .Select(failure => new ValidationError(failure.PropertyName, failure.ErrorMessage))
            .ToList();

        if (validationErrors.Any())
            throw new Exceptions.ValidationException(validationErrors);

        return await next();
    }
}
