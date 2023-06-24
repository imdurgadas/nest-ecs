import { Inject, Injectable } from '@nestjs/common';
import { Domain } from '../entity/domain.entity';
import { IDomainRepository } from './IDomainRepository.interface';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DomainRepository implements IDomainRepository {
  TABLE_NAME = 'domain';
  client = new DynamoDBClient({
    region: 'ap-south-1',
    credentials: fromNodeProviderChain(),
  });

  dynamoDbDocumentClient = DynamoDBDocumentClient.from(this.client);

  async create(domain: Domain): Promise<Domain> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Domain[]> {
    const cmd = new ScanCommand({
      TableName: this.TABLE_NAME,
    });
    const result = await this.dynamoDbDocumentClient.send(cmd);
    return result.Items as Domain[] | null;
  }

  async findById(id: string): Promise<Domain> {
    throw new Error('Method not implemented.');
  }
  async update(id: string, domain: Domain): Promise<Domain> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
