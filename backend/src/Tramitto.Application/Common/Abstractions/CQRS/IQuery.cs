namespace Tramitto.Application.Common.Abstractions.CQRS;

using MediatR;
using Tramitto.Domain.Abstractions;

public interface IQuery<TResponse> : IRequest<Result<TResponse>> { }
