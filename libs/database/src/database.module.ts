import { Module } from '@nestjs/common';
import { EnvModule } from '@app/common/configs/env.module';
import { PostgresProvider } from './postgres.provider';

@Module({
  imports: [EnvModule],
  providers: [PostgresProvider],
  exports: [PostgresProvider],
})
export class DatabaseModule {}
