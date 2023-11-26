import { NestFactory } from '@nestjs/core';
import { UserModule } from './infra/modules/user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
