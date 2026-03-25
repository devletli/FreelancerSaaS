import { Injectable } from '@nestjs/common';
import { MarketplaceRepository } from './platform/marketplace.repository';

@Injectable()
export class AppService {
  constructor(private readonly repository: MarketplaceRepository) {}

  getHealth() {
    return this.repository.getHealth();
  }
}
