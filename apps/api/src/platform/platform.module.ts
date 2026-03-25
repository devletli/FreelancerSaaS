import { Module } from '@nestjs/common';
import { MarketplaceRepository } from './marketplace.repository';

@Module({
  providers: [MarketplaceRepository],
  exports: [MarketplaceRepository],
})
export class PlatformModule {}
