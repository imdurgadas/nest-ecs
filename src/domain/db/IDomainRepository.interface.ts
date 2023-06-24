import { Domain } from '../entity/domain.entity';

export interface IDomainRepository {
  create(domain: Domain): Promise<Domain>;
  findAll(): Promise<Domain[] | null>;
  findById(id: string): Promise<Domain | null>;
  update(id: string, domain: Domain): Promise<Domain>;
  delete(id: string): Promise<boolean>;
}
