import {
  Contract,
  Job,
  Message,
  Profile,
  Proposal,
  Review,
  User,
} from '../common/types/marketplace.types';

export const users: User[] = [
  {
    id: 'user-client-1',
    email: 'ayse@northstar.studio',
    password: 'demo-client',
    fullName: 'Ayse Demir',
    role: 'client',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'user-freelancer-1',
    email: 'mert@pixelforge.dev',
    password: 'demo-freelancer',
    fullName: 'Mert Kaya',
    role: 'freelancer',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'user-freelancer-2',
    email: 'selin@motionlab.io',
    password: 'demo-freelancer',
    fullName: 'Selin Arslan',
    role: 'freelancer',
    avatarUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'user-admin-1',
    email: 'admin@freelancehub.io',
    password: 'demo-admin',
    fullName: 'Platform Admin',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
  },
];

export const profiles: Profile[] = [
  {
    userId: 'user-client-1',
    title: 'Product Design Lead',
    bio: 'Scaling SaaS products with strong UX and measurable conversion improvements.',
    skills: ['Product strategy', 'UX writing', 'User research'],
    hourlyRate: 0,
    rating: 4.9,
    successRate: 98,
  },
  {
    userId: 'user-freelancer-1',
    title: 'Senior Fullstack Engineer',
    bio: 'Next.js, NestJS and cloud-native delivery for B2B products.',
    skills: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis'],
    hourlyRate: 65,
    rating: 4.95,
    successRate: 99,
  },
  {
    userId: 'user-freelancer-2',
    title: 'Motion Designer & Brand Systems Specialist',
    bio: 'Creates product narratives with conversion-focused visual systems.',
    skills: ['Brand systems', 'Framer', 'Motion design'],
    hourlyRate: 58,
    rating: 4.88,
    successRate: 96,
  },
  {
    userId: 'user-admin-1',
    title: 'Operations Admin',
    bio: 'Marketplace governance, compliance and quality reviews.',
    skills: ['Moderation', 'Audit logs'],
    hourlyRate: 0,
    rating: 5,
    successRate: 100,
  },
];

export const jobs: Job[] = [
  {
    id: 'job-1',
    clientId: 'user-client-1',
    title: 'Rebuild SaaS onboarding for enterprise clients',
    description: 'Need a senior fullstack freelancer to redesign onboarding flows, implement instrumentation and deliver a clean App Router + NestJS architecture.',
    budgetMin: 4000,
    budgetMax: 6500,
    category: 'Fullstack Development',
    skills: ['Next.js', 'NestJS', 'PostgreSQL', 'Analytics'],
    status: 'open',
    deadline: '2026-04-18',
    createdAt: '2026-03-18T09:00:00.000Z',
  },
  {
    id: 'job-2',
    clientId: 'user-client-1',
    title: 'Client portal UI revamp with dashboard metrics',
    description: 'Refresh the main dashboard experience, introduce optimistic interactions and improve design consistency.',
    budgetMin: 2200,
    budgetMax: 3600,
    category: 'Frontend Design',
    skills: ['Design systems', 'React', 'Data visualization'],
    status: 'in_review',
    deadline: '2026-04-04',
    createdAt: '2026-03-12T14:30:00.000Z',
  },
  {
    id: 'job-3',
    clientId: 'user-client-1',
    title: 'Messaging workflow with audit trail',
    description: 'Implement contract-bound messaging, delivery states and searchable audit logs for admin review.',
    budgetMin: 1800,
    budgetMax: 2800,
    category: 'Backend Systems',
    skills: ['WebSocket', 'NestJS', 'CQRS'],
    status: 'completed',
    deadline: '2026-03-01',
    createdAt: '2026-02-10T10:15:00.000Z',
  },
];

export const proposals: Proposal[] = [
  {
    id: 'proposal-1',
    jobId: 'job-1',
    freelancerId: 'user-freelancer-1',
    price: 5800,
    deliveryDays: 21,
    coverLetter: 'I would split this into design audit, architecture hardening, and conversion instrumentation so shipping remains measurable.',
    createdAt: '2026-03-19T11:45:00.000Z',
  },
  {
    id: 'proposal-2',
    jobId: 'job-1',
    freelancerId: 'user-freelancer-2',
    price: 5100,
    deliveryDays: 18,
    coverLetter: 'Strong on storytelling layers and polished UX systems. I would partner with a backend specialist for deep platform work.',
    createdAt: '2026-03-20T08:20:00.000Z',
  },
  {
    id: 'proposal-3',
    jobId: 'job-2',
    freelancerId: 'user-freelancer-2',
    price: 3200,
    deliveryDays: 14,
    coverLetter: 'I can redesign the dashboard UI, align component rhythm and deliver an implementation-ready visual system.',
    createdAt: '2026-03-14T13:00:00.000Z',
  },
];

export const contracts: Contract[] = [
  {
    id: 'contract-1',
    jobId: 'job-3',
    clientId: 'user-client-1',
    freelancerId: 'user-freelancer-1',
    value: 2600,
    milestones: ['Socket transport', 'Persistence', 'Admin audit view'],
    status: 'completed',
    createdAt: '2026-02-15T09:00:00.000Z',
  },
  {
    id: 'contract-2',
    jobId: 'job-2',
    clientId: 'user-client-1',
    freelancerId: 'user-freelancer-2',
    value: 3200,
    milestones: ['Visual direction', 'Component implementation', 'QA pass'],
    status: 'active',
    createdAt: '2026-03-16T09:00:00.000Z',
  },
];

export const messages: Message[] = [
  {
    id: 'message-1',
    contractId: 'contract-2',
    senderId: 'user-client-1',
    content: 'Please prioritize the analytics summary block on the first dashboard screen.',
    sentAt: '2026-03-20T09:10:00.000Z',
  },
  {
    id: 'message-2',
    contractId: 'contract-2',
    senderId: 'user-freelancer-2',
    content: 'Understood. I will ship the dashboard narrative first and connect the chart system after the layout pass.',
    sentAt: '2026-03-20T09:14:00.000Z',
  },
];

export const reviews: Review[] = [
  {
    id: 'review-1',
    contractId: 'contract-1',
    authorId: 'user-client-1',
    recipientId: 'user-freelancer-1',
    rating: 5,
    comment: 'Senior execution, sharp communication and no surprise regressions during delivery.',
    createdAt: '2026-03-03T17:40:00.000Z',
  },
];
