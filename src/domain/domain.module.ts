import { Module } from '@nestjs/common';
import { DomainRepository } from './db/domain.repository';
import { DomainController } from './domain.controller';
import { DomainService } from './domain.service';

@Module({
  controllers: [DomainController],
  providers: [DomainService, DomainRepository],
})
export class DomainModule {}
