import { Injectable } from '@nestjs/common';
import { MarketplaceRepository } from '../platform/marketplace.repository';

@Injectable()
export class DashboardService {
  constructor(private readonly repository: MarketplaceRepository) {}

  getOverview() {
    return this.repository.getOverview();
  }
}
