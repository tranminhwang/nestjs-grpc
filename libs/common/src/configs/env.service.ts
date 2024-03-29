import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService, DatabaseConfig, GlobalConfigs } from './env.interface';

@Injectable()
export class EnvServices implements GlobalConfigs {
  constructor(private readonly configService: ConfigService) {}

  getAppPort(app: AppService): number {
    switch (app) {
      case AppService.GatewayService:
        return this.configService.get<number>('GATEWAY_SERVICE_PORT') || 8000;
      case AppService.UserService:
        return this.configService.get<number>('USER_SERVICE_PORT') || 8001;
      default:
        throw new Error(`App ${app} is not supported`);
    }
  }

  getPostgresConfig(): DatabaseConfig {
    return {
      dialect: 'postgres',
      host: this.configService.getOrThrow<string>('POSTGRES_HOST'),
      port: this.configService.getOrThrow<number>('POSTGRES_PORT'),
      username: this.configService.getOrThrow<string>('POSTGRES_USER'),
      password: this.configService.getOrThrow<string>('POSTGRES_PASSWORD'),
      database: this.configService.getOrThrow<string>('POSTGRES_DB'),
    };
  }
}
