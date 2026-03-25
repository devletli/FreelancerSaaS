import { Injectable } from '@nestjs/common';
import { MarketplaceRepository } from '../platform/marketplace.repository';
import { CreateProposalDto } from './dto/create-proposal.dto';

@Injectable()
export class ProposalsService {
  constructor(private readonly repository: MarketplaceRepository) {}

  listByJob(jobId: string) {
    return this.repository.listProposalsByJob(jobId);
  }

  create(payload: CreateProposalDto) {
    return this.repository.createProposal(payload);
  }
}
