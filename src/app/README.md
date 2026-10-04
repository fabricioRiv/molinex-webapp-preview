# Molinex Frontend Architecture

The Molinex SPA follows Domain-Driven Design and Clean Architecture principles. Business capabilities are separated into seven bounded contexts.

## Bounded Contexts

- `commercial-engagement`: plans and commercial inquiries.
- `identity-access-management`: authentication, users, roles, and permissions.
- `production-management`: raw material receptions, production batches, and production records.
- `quality-yield-control`: quality results, yield evaluation, and waste records.
- `asset-maintenance-management`: machines and maintenance records.
- `operational-intelligence`: operational readings, alerts, and recommendations.
- `reporting-analytics`: dashboards, indicators, and report summaries.

## Supporting Modules

- `production-quality-shared-kernel`: domain concepts shared exclusively by Production Management and Quality & Yield Control.
- `shared`: technical and presentation elements reusable across the SPA. It must not contain Molinex business rules.

Neither supporting module is a bounded context.

## Layers

Each bounded context is organized into the following layers:

### Domain

Contains entities, value objects, domain services, and business rules.

Domain code must not depend on Angular, HTTP clients, browser APIs, infrastructure, or presentation components.

### Application

Contains use cases, application services, ports, commands, queries, and state orchestration.

Application code may depend on its own domain but must not directly depend on concrete infrastructure implementations.

### Infrastructure

Contains HTTP clients, API resources, assemblers, mappers, persistence adapters, guards, and interceptors.

Infrastructure implements the ports required by the application layer and translates external data into domain objects.

### Presentation

Contains Angular components and routed views.

Presentation communicates with the application layer and must not invoke `HttpClient` or JSON Server directly.

## Dependency Rules

The expected dependency direction is:

```text
Presentation → Application → Domain
Infrastructure → Application and Domain
