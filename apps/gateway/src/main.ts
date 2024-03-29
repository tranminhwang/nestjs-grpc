import { NestFactory } from '@nestjs/core';
import { EnvServices, AppService } from '@app/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const environment = app.get(EnvServices);

  await app.listen(environment.getAppPort(AppService.UserService));
}
bootstrap();
