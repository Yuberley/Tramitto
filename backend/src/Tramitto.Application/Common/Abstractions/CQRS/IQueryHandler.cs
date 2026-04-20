namespace Tramitto.Application.Common.Abstractions.CQRS;

using MediatR;
using Tramitto.Domain.Abstractions;

public interface IQueryHandler<in TQuery, TResponse> : IRequestHandler<TQuery, Result<TResponse>>
    where TQuery : IQuery<TResponse> { }
