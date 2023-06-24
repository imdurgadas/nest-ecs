import { Module } from '@nestjs/common';
import { DomainRepository } from './db/domain.repository';
import { DomainController } from './domain.controller';
import { DomainService } from './domain.service';
import { IDomainRepository } from './db/IDomainRepository.interface';

@Module({
  controllers: [DomainController],
  providers: [
    DomainService,
    {
      provide: 'IDomainRepository',
      useValue: new DomainRepository(),
    },
  ],
})
export class DomainModule {}
