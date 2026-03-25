import { Injectable } from '@nestjs/common';
import { MarketplaceRepository } from '../platform/marketplace.repository';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(private readonly repository: MarketplaceRepository) {}

  list() {
    return this.repository.listJobs();
  }

  getById(jobId: string) {
    return this.repository.getJobDetails(jobId);
  }

  create(payload: CreateJobDto) {
    return this.repository.createJob(payload);
  }
}
