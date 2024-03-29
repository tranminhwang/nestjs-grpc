import { Module } from '@nestjs/common';
import { EnvModule } from '@app/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EnvModule, AuthModule],
  providers: [],
})
export class AppModule {}
