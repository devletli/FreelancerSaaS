import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  list() {
    return this.jobsService.list();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.jobsService.getById(id);
  }

  @Post()
  create(@Body() payload: CreateJobDto) {
    return this.jobsService.create(payload);
  }
}
