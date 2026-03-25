import { Injectable } from '@nestjs/common';
import { MarketplaceRepository } from '../platform/marketplace.repository';
import { CreateContractDto } from './dto/create-contract.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ContractsService {
  constructor(private readonly repository: MarketplaceRepository) {}

  create(payload: CreateContractDto) {
    return this.repository.createContract(payload);
  }

  getById(contractId: string) {
    return this.repository.getContract(contractId);
  }

  getMessages(contractId: string) {
    return this.repository.getContractMessages(contractId);
  }

  addMessage(contractId: string, payload: CreateMessageDto) {
    return this.repository.addMessage({ contractId, ...payload });
  }
}
