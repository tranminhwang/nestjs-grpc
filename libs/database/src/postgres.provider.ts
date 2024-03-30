import { EnvServices } from '@app/common/configs/env.service';
import { Provider } from '@nestjs/common';
import { UserEntity } from 'apps/user/src/entities';
import { Sequelize } from 'sequelize-typescript';

export const PostgresProvider: Provider = {
  provide: 'PostgresProvider',
  useFactory: async (config: EnvServices) => {
    const db: Sequelize = new Sequelize(
      config.getPostgresConfig().database,
      config.getPostgresConfig().username,
      config.getPostgresConfig().password,
      {
        dialect: config.getPostgresConfig().dialect,
        host: config.getPostgresConfig().host,
        port: config.getPostgresConfig().port,
        benchmark: true,
        retry: {
          max: 3,
        },
      },
    );
    db.addModels([UserEntity]);
    await db.sync();

    return db;
  },
  inject: [EnvServices],
};
