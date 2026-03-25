# 🧑‍💻 Freelance Marketplace (Upwork-lite) – SENIOR SaaS ARCHITECTURE

Production-level, scalable, real-world fullstack proje dokümantasyonu.
Amaç: Recruiter + müşteri etkileyen **gerçek sistem tasarımı**.

---

# 🧠 0. PRODUCT & USE CASES

## Core Roles
- Client (iş veren)
- Freelancer (iş yapan)
- Admin

## Core Use Cases
- Client job post eder
- Freelancer teklif verir
- Chat ile iletişim
- Job awarded → completed → review

---

# 🏗️ 1. SYSTEM ARCHITECTURE

## Stack
- Frontend: Next.js (App Router)
- Backend: NestJS (modüler)
- DB: PostgreSQL (Prisma)
- Cache/Queue: Redis + BullMQ
- Realtime: WebSocket (Socket.io)
- Storage: S3 (dosya)

## High-Level Flow
1. Client job oluşturur
2. Freelancers listeler ve teklif verir
3. Chat başlar
4. Client freelancer seçer
5. İş tamamlanır → review

---

# 🧩 2. DOMAIN DESIGN

## Entities
- User
- Profile
- Job
- Proposal
- Contract
- Message
- Review

---

# 🗄️ 3. DATABASE DESIGN

## Users
- id
- email
- password_hash
- role (client/freelancer/admin)

## Profiles
- user_id
- bio
- skills
- rating

## Jobs
- id
- client_id
- title
- description
- budget
- status

## Proposals
- id
- job_id
- freelancer_id
- price
- cover_letter

## Contracts
- id
- job_id
- freelancer_id
- status

## Messages
- id
- contract_id
- sender_id
- content

## Reviews
- id
- contract_id
- rating
- comment

---

# ⚙️ 4. BACKEND (CLEAN ARCHITECTURE)

## Layers
- Controller
- Service
- Repository
- Domain

## Modules
- Auth
- User
- Job
- Proposal
- Contract
- Chat
- Review

## API Endpoints (Örnek)

### Auth
- POST /auth/register
- POST /auth/login

### Jobs
- POST /jobs
- GET /jobs
- GET /jobs/:id

### Proposals
- POST /proposals
- GET /jobs/:id/proposals

### Contracts
- POST /contracts

### Chat
- WS /messages

---

# 🔁 5. REAL-TIME CHAT

## Features
- WebSocket connection
- Typing indicator
- Message persistence

## Flow
1. User bağlanır
2. Room (contract_id)
3. Mesaj gönderilir
4. DB + broadcast

---

# 🎨 6. FRONTEND (PRO LEVEL UI)

## Pages
- Landing
- Auth
- Dashboard
- Job List
- Job Detail
- Chat Page

## Components
- Job Card
- Proposal Card
- Chat Window
- User Profile

## State Management
- React Query
- Zustand (opsiyonel)

## UX
- Skeleton loading
- Optimistic updates
- Toast notifications

---

# 🔐 7. AUTH & SECURITY

- JWT + refresh token
- Role-based access (RBAC)
- Rate limiting
- Input validation (Zod)

---

# 📦 8. QUEUE SYSTEM

## Jobs
- Email notifications
- Background cleanup

---

# 📊 9. ANALYTICS

- Job success rate
- User activity
- Earnings metrics

---

# 🧪 10. TESTING

## Unit
- Services

## Integration
- API endpoints

## E2E
- Job → Proposal → Contract flow

---

# 🚀 11. DEVOPS

## CI/CD
- GitHub Actions

## Deploy
- FE: Vercel
- BE: Fly.io / Railway

---

# 📈 12. SCALABILITY

- Stateless API
- Horizontal scaling
- DB indexing
- Redis caching

---

# 🧠 13. SENIOR TOUCHES

- Event-driven architecture (domain events)
- Soft deletes
- Audit logs
- API versioning

---

# 🔥 14. ROADMAP

## Phase 1
- Basic job + proposal

## Phase 2
- Chat + contracts

## Phase 3
- Payments + reviews

---

# 🧪 15. TEST SCENARIOS

- Client job oluşturur
- Freelancer teklif verir
- Chat başlar
- Contract oluşur
- Review verilir

---

# 🏁 SON

Bu proje:
- System design gösterir
- Backend + frontend + realtime kanıtlar
- Seni direkt öne çıkarır

👉 README + demo + video eklemeyi unutma.

