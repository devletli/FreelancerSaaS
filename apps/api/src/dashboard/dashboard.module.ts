import { Module } from '@nestjs/common';
import { PlatformModule } from '../platform/platform.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [PlatformModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
