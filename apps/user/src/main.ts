import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GrpcPackage } from '@app/common';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(process.cwd(), './proto/user.proto'),
        package: GrpcPackage.User,
      },
    },
  );
  await app.listen();
}
bootstrap();
