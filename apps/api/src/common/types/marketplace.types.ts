export type UserRole = 'client' | 'freelancer' | 'admin';

export type JobStatus = 'open' | 'in_review' | 'in_progress' | 'completed';

export type ContractStatus = 'pending' | 'active' | 'completed';

export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  avatarUrl: string;
}

export interface Profile {
  userId: string;
  title: string;
  bio: string;
  skills: string[];
  hourlyRate: number;
  rating: number;
  successRate: number;
}

export interface Job {
  id: string;
  clientId: string;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  category: string;
  skills: string[];
  status: JobStatus;
  deadline: string;
  createdAt: string;
}

export interface Proposal {
  id: string;
  jobId: string;
  freelancerId: string;
  price: number;
  deliveryDays: number;
  coverLetter: string;
  createdAt: string;
}

export interface Contract {
  id: string;
  jobId: string;
  clientId: string;
  freelancerId: string;
  value: number;
  milestones: string[];
  status: ContractStatus;
  createdAt: string;
}

export interface Message {
  id: string;
  contractId: string;
  senderId: string;
  content: string;
  sentAt: string;
}

export interface Review {
  id: string;
  contractId: string;
  authorId: string;
  recipientId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface UserSummary {
  id: string;
  fullName: string;
  role: UserRole;
  avatarUrl: string;
  title: string;
  rating: number;
  successRate: number;
}

export interface JobDetails {
  job: Job;
  client: UserSummary;
  proposals: Array<Proposal & { freelancer: UserSummary }>;
  contract: (Contract & {
    client: UserSummary;
    freelancer: UserSummary;
    messages: Array<Message & { sender: Pick<UserSummary, 'id' | 'fullName' | 'avatarUrl'> }>;
  }) | null;
  reviews: Array<Review & { author: Pick<UserSummary, 'id' | 'fullName' | 'avatarUrl'> }>;
}
