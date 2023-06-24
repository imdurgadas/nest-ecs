import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DomainRepository } from './db/domain.repository';
import { IDomainRepository } from './db/IDomainRepository.interface';
import { error } from 'console';

@Injectable()
export class DomainService {
  private logger = new Logger(DomainService.name);
  constructor(
    @Inject('IDomainRepository') private domainRepository: IDomainRepository,
  ) {}

  async findAllDomains() {
    try {
      return await this.domainRepository.findAll();
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      throw new InternalServerErrorException(e.toString());
    }
  }
}
