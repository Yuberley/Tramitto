namespace Tramitto.Application.Common.Abstractions.CQRS;

using MediatR;
using Tramitto.Domain.Abstractions;

public interface IBaseCommand { }

public interface ICommand : IRequest<Result>, IBaseCommand { }

public interface ICommand<TResponse> : IRequest<Result<TResponse>>, IBaseCommand { }
