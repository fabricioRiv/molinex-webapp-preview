# Molinex Web Application

Molinex is a web application for managing and monitoring rice mill operations. It centralizes production, quality control, machinery maintenance, operational alerts, reporting, and access management.

This repository contains the Single-Page Application (SPA) developed by the Vanguard Open Source team.

## Technology Stack

- Angular 22
- TypeScript
- Angular Material
- ngx-translate
- JSON Server
- Vitest
- npm

## Prerequisites

- Node.js 24 or later
- npm 11 or later
- Angular CLI 22

## Getting Started

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Vanguard-open-source/molinex-webapp.git
cd molinex-webapp
npm install
```

Start the Angular application:

```bash
npm start
```

The application will be available at:

```text
http://localhost:4200
```

## Fake API

The development environment uses JSON Server to simulate the backend REST API.

Run `server/start.sh` from its IntelliJ run configuration or execute the following command from the project root in PowerShell:

```powershell
& ".\node_modules\.bin\json-server.cmd" --watch server\db.json --routes server\routes.json --port 3000
```

The fake API will be available at:

```text
http://localhost:3000/api/v1
```

## Architecture

The frontend follows Domain-Driven Design principles and organizes the application around the following bounded contexts:

- Commercial Engagement
- Identity and Access Management
- Production Management
- Quality and Yield Control
- Asset and Maintenance Management
- Operational Intelligence
- Reporting and Analytics

Production Management and Quality and Yield Control share common domain concepts through a Shared Kernel.

Each bounded context is organized using the following layers:

- Domain
- Application
- Infrastructure
- Presentation

## Documentation

The product documentation, user stories, wireflows, mockups, C4 diagrams, and Domain-Driven Design artifacts are maintained in the following repository:

[Molinex Project Report](https://github.com/Vanguard-open-source/molinex-report)

## Development Workflow

The project uses Git Flow:

- `main`: stable production-ready code.
- `develop`: integration branch.
- `feature/*`: feature development branches.

Commit messages follow the Conventional Commits specification.

## Team

Vanguard Open Source Development Team

## License

This project is licensed under the MIT License.
