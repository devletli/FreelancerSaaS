# Freelance Marketplace SaaS Starter

Fullstack starter project for a production-style freelance marketplace with:

- Next.js App Router frontend in `apps/web`
- NestJS backend API in `apps/api`
- Marketplace domain flows for jobs, proposals, contracts, messages and reviews
- Demo-safe API fallback on the frontend so the UI can still render without a running backend

## Structure

- `apps/web`: recruiter-facing marketplace UI
- `apps/api`: modular NestJS API with validation and seeded in-memory repository
- `freelance_marketplace_senior_fullstack_saa_s.md`: initial architecture brief

## Quick start

```bash
npm run dev
```

Or run separately:

```bash
npm run dev:api
npm run dev:web
```

Frontend default URL: `http://localhost:3101`

Backend default URL: `http://localhost:3100`

## Validation

```bash
npm run test
```

This runs:

- frontend lint + production build smoke test
- backend unit tests
- backend e2e tests

## Notes

- The backend currently uses an in-memory repository seeded with realistic marketplace data so the project is runnable without infrastructure.
- The architecture is already split into domain modules, making it straightforward to swap the repository for Prisma/PostgreSQL later.
- Frontend data fetches automatically fall back to local mock data if the API is unavailable during build or demos.
