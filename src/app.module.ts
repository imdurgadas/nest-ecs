import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DomainModule } from './domain/domain.module';
import { AppController } from './app.controller';
import configuration from './config/configuration';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configuration],
      cache: true,
    }),
    DomainModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
