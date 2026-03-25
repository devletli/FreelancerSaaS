import { Module } from '@nestjs/common';
import { PlatformModule } from '../platform/platform.module';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';

@Module({
  imports: [PlatformModule],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}
