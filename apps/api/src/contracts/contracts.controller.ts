import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  create(@Body() payload: CreateContractDto) {
    return this.contractsService.create(payload);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.contractsService.getById(id);
  }

  @Get(':id/messages')
  getMessages(@Param('id') id: string) {
    return this.contractsService.getMessages(id);
  }

  @Post(':id/messages')
  addMessage(@Param('id') id: string, @Body() payload: CreateMessageDto) {
    return this.contractsService.addMessage(id, payload);
  }
}
