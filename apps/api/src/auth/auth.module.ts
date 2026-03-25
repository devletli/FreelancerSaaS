import { Module } from '@nestjs/common';
import { PlatformModule } from '../platform/platform.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PlatformModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
