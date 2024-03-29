import { Module } from '@nestjs/common';
import { EnvModule, UtilsModule } from '@app/common';
import { DatabaseModule } from '@app/database';
import { UserController } from './user.controller';
import { UserServicesImpl } from './user.service';
import { User } from './entities';

@Module({
  imports: [EnvModule, DatabaseModule, UtilsModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useValue: User,
    },
    {
      provide: 'UserServices',
      useClass: UserServicesImpl,
    },
  ],
})
export class UserModule {}
