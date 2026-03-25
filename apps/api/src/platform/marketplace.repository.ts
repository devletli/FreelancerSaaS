import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {
  Contract,
  Job,
  JobDetails,
  Message,
  Profile,
  Proposal,
  Review,
  User,
  UserRole,
  UserSummary,
} from '../common/types/marketplace.types';
import {
  contracts as seedContracts,
  jobs as seedJobs,
  messages as seedMessages,
  profiles as seedProfiles,
  proposals as seedProposals,
  reviews as seedReviews,
  users as seedUsers,
} from './seed.data';

@Injectable()
export class MarketplaceRepository {
  private readonly users: User[] = structuredClone(seedUsers);
  private readonly profiles: Profile[] = structuredClone(seedProfiles);
  private readonly jobs: Job[] = structuredClone(seedJobs);
  private readonly proposals: Proposal[] = structuredClone(seedProposals);
  private readonly contracts: Contract[] = structuredClone(seedContracts);
  private readonly messages: Message[] = structuredClone(seedMessages);
  private readonly reviews: Review[] = structuredClone(seedReviews);

  getHealth() {
    return {
      service: 'freelancer-marketplace-api',
      status: 'ok',
      timestamp: new Date().toISOString(),
      counts: {
        users: this.users.length,
        jobs: this.jobs.length,
        proposals: this.proposals.length,
        contracts: this.contracts.length,
      },
    };
  }

  registerUser(input: {
    email: string;
    password: string;
    fullName: string;
    role: UserRole;
    title?: string;
    bio?: string;
  }) {
    const existingUser = this.users.find((user) => user.email === input.email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists with this email.');
    }

    const user: User = {
      id: crypto.randomUUID(),
      email: input.email,
      password: input.password,
      fullName: input.fullName,
      role: input.role,
      avatarUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=300&q=80',
    };

    const profile: Profile = {
      userId: user.id,
      title: input.title ?? (input.role === 'client' ? 'Hiring Manager' : 'Independent Specialist'),
      bio: input.bio ?? 'Recently joined the marketplace.',
      skills: [],
      hourlyRate: 0,
      rating: 0,
      successRate: 0,
    };

    this.users.push(user);
    this.profiles.push(profile);

    return {
      user: this.buildUserSummary(user.id),
      accessToken: `demo-access-${user.id}`,
      refreshToken: `demo-refresh-${user.id}`,
    };
  }

  login(email: string, password: string) {
    const user = this.users.find(
      (candidate) => candidate.email === email && candidate.password === password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return {
      user: this.buildUserSummary(user.id),
      accessToken: `demo-access-${user.id}`,
      refreshToken: `demo-refresh-${user.id}`,
    };
  }

  listJobs() {
    return this.jobs
      .slice()
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .map((job) => ({
        ...job,
        proposalCount: this.proposals.filter((proposal) => proposal.jobId === job.id).length,
        client: this.buildUserSummary(job.clientId),
      }));
  }

  getJobDetails(jobId: string): JobDetails {
    const job = this.jobs.find((candidate) => candidate.id === jobId);
    if (!job) {
      throw new NotFoundException(`Job ${jobId} was not found.`);
    }

    const contract = this.contracts.find((candidate) => candidate.jobId === job.id) ?? null;

    return {
      job,
      client: this.buildUserSummary(job.clientId),
      proposals: this.proposals
        .filter((proposal) => proposal.jobId === job.id)
        .sort((left, right) => left.createdAt.localeCompare(right.createdAt))
        .map((proposal) => ({
          ...proposal,
          freelancer: this.buildUserSummary(proposal.freelancerId),
        })),
      contract: contract
        ? {
            ...contract,
            client: this.buildUserSummary(contract.clientId),
            freelancer: this.buildUserSummary(contract.freelancerId),
            messages: this.messages
              .filter((message) => message.contractId === contract.id)
              .sort((left, right) => left.sentAt.localeCompare(right.sentAt))
              .map((message) => ({
                ...message,
                sender: this.pickMessageSender(message.senderId),
              })),
          }
        : null,
      reviews: this.reviews
        .filter((review) => review.contractId === contract?.id)
        .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
        .map((review) => ({
          ...review,
          author: this.pickMessageSender(review.authorId),
        })),
    };
  }

  createJob(input: {
    clientId: string;
    title: string;
    description: string;
    budgetMin: number;
    budgetMax: number;
    category: string;
    skills: string[];
    deadline: string;
  }) {
    this.assertUserExists(input.clientId);

    const job: Job = {
      id: crypto.randomUUID(),
      clientId: input.clientId,
      title: input.title,
      description: input.description,
      budgetMin: input.budgetMin,
      budgetMax: input.budgetMax,
      category: input.category,
      skills: input.skills,
      status: 'open',
      deadline: input.deadline,
      createdAt: new Date().toISOString(),
    };

    this.jobs.unshift(job);
    return job;
  }

  listProposalsByJob(jobId: string) {
    this.assertJobExists(jobId);

    return this.proposals
      .filter((proposal) => proposal.jobId === jobId)
      .map((proposal) => ({
        ...proposal,
        freelancer: this.buildUserSummary(proposal.freelancerId),
      }));
  }

  createProposal(input: {
    jobId: string;
    freelancerId: string;
    price: number;
    deliveryDays: number;
    coverLetter: string;
  }) {
    this.assertJobExists(input.jobId);
    this.assertUserExists(input.freelancerId);

    const proposal: Proposal = {
      id: crypto.randomUUID(),
      jobId: input.jobId,
      freelancerId: input.freelancerId,
      price: input.price,
      deliveryDays: input.deliveryDays,
      coverLetter: input.coverLetter,
      createdAt: new Date().toISOString(),
    };

    this.proposals.unshift(proposal);
    return {
      ...proposal,
      freelancer: this.buildUserSummary(proposal.freelancerId),
    };
  }

  createContract(input: {
    jobId: string;
    clientId: string;
    freelancerId: string;
    value: number;
    milestones: string[];
  }) {
    this.assertJobExists(input.jobId);
    this.assertUserExists(input.clientId);
    this.assertUserExists(input.freelancerId);

    const contract: Contract = {
      id: crypto.randomUUID(),
      jobId: input.jobId,
      clientId: input.clientId,
      freelancerId: input.freelancerId,
      value: input.value,
      milestones: input.milestones,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    this.contracts.unshift(contract);

    const job = this.jobs.find((candidate) => candidate.id === input.jobId);
    if (job) {
      job.status = 'in_progress';
    }

    return contract;
  }

  getContract(contractId: string) {
    const contract = this.contracts.find((candidate) => candidate.id === contractId);
    if (!contract) {
      throw new NotFoundException(`Contract ${contractId} was not found.`);
    }

    return {
      ...contract,
      client: this.buildUserSummary(contract.clientId),
      freelancer: this.buildUserSummary(contract.freelancerId),
      job: this.jobs.find((job) => job.id === contract.jobId),
    };
  }

  getContractMessages(contractId: string) {
    this.getContract(contractId);

    return this.messages
      .filter((message) => message.contractId === contractId)
      .sort((left, right) => left.sentAt.localeCompare(right.sentAt))
      .map((message) => ({
        ...message,
        sender: this.pickMessageSender(message.senderId),
      }));
  }

  addMessage(input: { contractId: string; senderId: string; content: string }) {
    this.getContract(input.contractId);
    this.assertUserExists(input.senderId);

    const message: Message = {
      id: crypto.randomUUID(),
      contractId: input.contractId,
      senderId: input.senderId,
      content: input.content,
      sentAt: new Date().toISOString(),
    };

    this.messages.push(message);

    return {
      ...message,
      sender: this.pickMessageSender(message.senderId),
    };
  }

  createReview(input: {
    contractId: string;
    authorId: string;
    recipientId: string;
    rating: number;
    comment: string;
  }) {
    this.getContract(input.contractId);
    this.assertUserExists(input.authorId);
    this.assertUserExists(input.recipientId);

    const review: Review = {
      id: crypto.randomUUID(),
      contractId: input.contractId,
      authorId: input.authorId,
      recipientId: input.recipientId,
      rating: input.rating,
      comment: input.comment,
      createdAt: new Date().toISOString(),
    };

    this.reviews.unshift(review);
    return {
      ...review,
      author: this.pickMessageSender(review.authorId),
    };
  }

  getOverview() {
    const openJobs = this.jobs.filter((job) => job.status === 'open').length;
    const activeContracts = this.contracts.filter((contract) => contract.status === 'active').length;
    const completedContracts = this.contracts.filter(
      (contract) => contract.status === 'completed',
    ).length;
    const averageRating =
      this.reviews.reduce((sum, review) => sum + review.rating, 0) / (this.reviews.length || 1);

    return {
      stats: {
        openJobs,
        activeContracts,
        completedContracts,
        totalFreelancers: this.users.filter((user) => user.role === 'freelancer').length,
        averageRating: Number(averageRating.toFixed(2)),
      },
      featuredJobs: this.listJobs().slice(0, 3),
      activeContracts: this.contracts
        .filter((contract) => contract.status !== 'completed')
        .map((contract) => ({
          ...contract,
          client: this.buildUserSummary(contract.clientId),
          freelancer: this.buildUserSummary(contract.freelancerId),
          job: this.jobs.find((job) => job.id === contract.jobId),
        })),
      recentReviews: this.reviews.slice(0, 3).map((review) => ({
        ...review,
        author: this.pickMessageSender(review.authorId),
        recipient: this.pickMessageSender(review.recipientId),
      })),
    };
  }

  private buildUserSummary(userId: string): UserSummary {
    const user = this.assertUserExists(userId);
    const profile = this.profiles.find((candidate) => candidate.userId === userId);

    return {
      id: user.id,
      fullName: user.fullName,
      role: user.role,
      avatarUrl: user.avatarUrl,
      title: profile?.title ?? 'Marketplace user',
      rating: profile?.rating ?? 0,
      successRate: profile?.successRate ?? 0,
    };
  }

  private pickMessageSender(userId: string) {
    const user = this.buildUserSummary(userId);
    return {
      id: user.id,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
    };
  }

  private assertJobExists(jobId: string) {
    const job = this.jobs.find((candidate) => candidate.id === jobId);
    if (!job) {
      throw new NotFoundException(`Job ${jobId} was not found.`);
    }

    return job;
  }

  private assertUserExists(userId: string) {
    const user = this.users.find((candidate) => candidate.id === userId);
    if (!user) {
      throw new NotFoundException(`User ${userId} was not found.`);
    }

    return user;
  }
}
