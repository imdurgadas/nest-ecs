import { Controller, Get } from '@nestjs/common';
import { DomainService } from './domain.service';

@Controller('domains')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Get()
  async getDomains() {
    return await this.domainService.findAllDomains();
  }
}
