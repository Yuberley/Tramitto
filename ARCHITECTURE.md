# 🏗️ Tramito — Arquitectura del Sistema

## 1. Stack Tecnológico Seleccionado

### Backend (Core API & Webhooks)
* **Framework:** .NET 10
* **Lenguaje:** C#
* **Arquitectura:** Clean Architecture (Domain-Driven Design)
  * `Domain`: Entidades core, interfaces de repositorios, excepciones de dominio (Sin dependencias externas).
  * `Application`: Casos de uso (CQRS recomendado), lógica de negocio, validaciones.
  * `Infrastructure`: Implementación de base de datos (EF Core), integración con pasarelas de pago, HTTP Clients (WhatsApp API, Truora), RabbitMQ.
  * `WebApi`: Controladores REST, Middlewares, Filtros de Excepciones, Configuración de Inyección de Dependencias.

### Frontend (Web App Helpers & Admin)
* **Librería:** React 19
* **Lenguaje:** TypeScript
* **Arquitectura:** Feature-Based Architecture
  * `app/`: Configuración global, providers, enrutamiento principal.
  * `features/`: Módulos de negocio aislados (Ej: `auth`, `tasks`, `wallet`). Cada feature contiene sus propios componentes, hooks, estado y servicios.
  * `shared/`: Componentes UI reutilizables (botones, modales), utilidades, hooks genéricos.

### Base de Datos & Almacenamiento
* **Relacional Core:** PostgreSQL
* **Geoespacial:** PostGIS (Extensión para consultas de radio/distancia de Helpers).

### Caché & Asincronía
* **Caché:** Redis (Para manejo de sesiones rápidas, rate limiting de WhatsApp y estados efímeros).
* **Message Broker:** RabbitMQ (Para encolar webhooks de WhatsApp, procesamiento de pagos asíncronos y notificaciones).

## 2. Patrones de Diseño Clave
* **Adapter Pattern:** Para las pasarelas de pago. La capa de `Application` usará una interfaz `IPaymentGateway` y en `Infrastructure` se implementarán los adaptadores específicos (ePayco, PayU).
* **Ledger Pattern:** Base de datos inmutable (Append-only) para la billetera virtual de los Helpers, garantizando consistencia ACID.
* **CQRS (Command Query Responsibility Segregation):** Recomendado en la capa de `Application` (usando MediatR) para separar las lecturas (ej. buscar tareas cercanas) de las escrituras (ej. procesar un pago).