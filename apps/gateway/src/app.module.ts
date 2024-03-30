import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { EnvModule } from '@app/common';
import { AuthModule } from './auth/auth.module';
import { protobufPackage as userProtobufPackage } from '@app/common/types/user';

@Module({
  imports: [
    EnvModule,
    AuthModule,
    ClientsModule.register({
      isGlobal: true,
      clients: [
        {
          name: 'UserServicesClient',
          transport: Transport.GRPC,
          options: {
            package: userProtobufPackage,
            protoPath: join(process.cwd(), './proto/user.proto'),
          },
        },
      ],
    }),
  ],
  providers: [],
})
export class AppModule {}
