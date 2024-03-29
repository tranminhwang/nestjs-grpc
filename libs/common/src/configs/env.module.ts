import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvServices } from './env.service';
import validate from './env.validate';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true, validate }),
  ],
  providers: [EnvServices],
  exports: [EnvServices],
})
export class EnvModule {}
