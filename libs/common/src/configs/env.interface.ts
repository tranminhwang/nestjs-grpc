export enum AppService {
  UserService = 'user_service',
  GatewayService = 'gateway_service',
}

export type DatabaseConfig = {
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export interface GlobalConfigs {
  getAppPort(app: AppService): number;
  getPostgresConfig(): DatabaseConfig;
}
