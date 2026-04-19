# Tramito

Plataforma bajo demanda que conecta personas que necesitan delegar trámites, filas y mandados con una red de ejecutores verificados — operando 100% desde WhatsApp, sin apps que descargar.

## El problema

Ir al banco, hacer una fila en la EPS, recoger un medicamento o gestionar un documento consume horas de un día laboral. Tiempo que la mayoría no puede permitirse perder.

## La solución

Tramito actúa como intermediario digital: el cliente describe su necesidad por WhatsApp, la plataforma genera un estimado de precio, y Helpers verificados compiten en una subasta a ciegas para tomar la tarea. El cliente elige, paga de forma segura (escrow), y recibe evidencias del resultado.

## Cómo funciona

1. **Cliente** escribe su solicitud por WhatsApp — sin registros, sin apps.
2. **Tramito** cotiza automáticamente con un rango de precio estimado.
3. **Helpers** ven la tarea en su feed y ofertan su precio (subasta a ciegas).
4. **Cliente** elige al Helper que prefiera según precio y calificación.
5. **Pago retenido** en escrow hasta que el cliente confirma la entrega.
6. **Ambos se califican** al cierre — construyendo reputación en la red.

## Usuarios

| Rol | Canal | Descripción |
|---|---|---|
| **Cliente** | WhatsApp | Delega tareas sin descargar nada |
| **Helper** | Web App | Ejecuta tareas y genera ingresos flexibles |
| **Admin** | Web App | Monitorea la operación y configura el sistema |

## Casos de uso (MVP)

- Trámites físicos: EPS, notarías, bancos, reclamación de medicamentos
- Compras y mandados: farmacia, mercado ligero, entregas locales
- Filas y turnos: delegación de tiempos de espera
- Gestiones digitales: agendamientos, certificados en línea, redacción de documentos

## Stack

| Capa | Tecnología |
|---|---|
| Backend | .NET 10 · C# · Clean Architecture · CQRS |
| Frontend | React 19 · TypeScript · Feature-Based Architecture |
| Base de datos | PostgreSQL · PostGIS |
| Infraestructura | Redis · RabbitMQ |
| Canal cliente | WhatsApp Cloud API (Meta) |
| KYC | Truora |
| Pagos | Adapter Pattern — agnóstico de proveedor (ePayco / PayU / Wompi) |

## Mercado inicial

MVP validado en **Cumaral, Meta, Colombia** (~25.500 habitantes). Meta de validación: 3 meses post-lanzamiento con al menos 50 tareas semanales y 40% de tasa de conversión.
