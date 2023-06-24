import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DomainRepository } from './db/domain.repository';

@Injectable()
export class DomainService {
  private logger = new Logger(DomainService.name);
  constructor(private domainRepository: DomainRepository) {}

  async findAllDomains() {
    try {
      return await this.domainRepository.findAll();
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      throw new InternalServerErrorException(e.toString());
    }
  }
}
