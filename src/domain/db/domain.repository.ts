import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Domain } from '../entity/domain.entity';

@Injectable()
export class DomainRepository {
  private TABLE_NAME: string;
  private dynamoDbDocumentClient;

  constructor(configService: ConfigService) {
    this.TABLE_NAME = configService.get<string>('DOMAIN_NAME_DDB_TABLE_NAME');
    const client = new DynamoDBClient({
      region: 'ap-south-1',
      credentials: fromNodeProviderChain(),
    });

    this.dynamoDbDocumentClient = DynamoDBDocumentClient.from(client);
  }

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
