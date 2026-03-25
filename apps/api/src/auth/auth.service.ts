import { Injectable } from '@nestjs/common';
import { MarketplaceRepository } from '../platform/marketplace.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly repository: MarketplaceRepository) {}

  register(payload: RegisterDto) {
    return this.repository.registerUser(payload);
  }

  login(payload: LoginDto) {
    return this.repository.login(payload.email, payload.password);
  }
}
