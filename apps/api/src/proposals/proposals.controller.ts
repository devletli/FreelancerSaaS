import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { ProposalsService } from './proposals.service';

@Controller()
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Get('jobs/:jobId/proposals')
  listByJob(@Param('jobId') jobId: string) {
    return this.proposalsService.listByJob(jobId);
  }

  @Post('proposals')
  create(@Body() payload: CreateProposalDto) {
    return this.proposalsService.create(payload);
  }
}
