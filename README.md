# CRM Admin Dashboard

A production-style CRM Admin Dashboard built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

The purpose of this project is not only to build a CRM application but also to follow a professional frontend engineering workflow. Every feature is developed in its own branch, reviewed through Pull Requests, and merged into the `develop` branch before being promoted to `main`.

This repository serves as a portfolio project that demonstrates scalable architecture, maintainable code, and modern frontend best practices.

---

## Project Goals

- Build a realistic CRM Admin Dashboard
- Follow a professional Git branching strategy
- Practice code reviews using Pull Requests
- Write clean, maintainable, and scalable code
- Apply modern React architecture and best practices
- Create a portfolio project that reflects real-world frontend development

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Radix UI
- React Router
- Redux Toolkit _(planned)_
- TanStack Query _(planned)_
- React Hook Form _(planned)_
- Zod _(planned)_

---

## Git Workflow

This project follows a simplified Git Flow.

```text
main
│
develop
│
├── feature/project-setup
├── feature/app-layout
├── feature/authentication
├── feature/dashboard
├── feature/users
├── feature/products
└── ...
```

- `main` → Production-ready code
- `develop` → Integration branch
- `feature/*` → Individual features

Every feature is developed in its own branch and merged into `develop` through a Pull Request. Stable releases are merged from `develop` into `main`.

---

## Getting Started

Clone the repository.

```bash
git clone <repository-url>
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Build for production.

```bash
npm run build
```

Run linting.

```bash
npm run lint
```

---

## Planned Features

- Authentication
- Dashboard Overview
- User Management
- Customer Management
- Product Management
- Order Management
- Role-Based Access Control
- Theme Switching
- Search & Filtering
- Pagination
- Form Validation
- Error Handling
- Responsive Layout
- Dark Mode

---

## Engineering Principles

This project focuses on writing code that is:

- Modular
- Reusable
- Maintainable
- Accessible
- Type-safe
- Performance-conscious
- Easy to test
- Easy to scale

Whenever possible, architectural decisions are made with long-term maintainability in mind rather than short-term convenience.

---

## Roadmap

- [x] Project setup
- [ ] Folder architecture
- [ ] Application layout
- [ ] Authentication
- [ ] Dashboard
- [ ] User Management
- [ ] Product Management
- [ ] API Integration
- [ ] Testing
- [ ] Performance Optimization
- [ ] CI/CD

---

## License

This project is created for learning, portfolio, and demonstration purposes.
