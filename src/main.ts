import { NestFactory } from '@nestjs/core';
import { UserModule } from './infra/modules/user.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const config = new DocumentBuilder()
    .setTitle('Movies Catalog API - Documentation')
    .setDescription(
      'This API serves as a movie catalog system integrated with JWT authentication. It provides a comprehensive collection of films and their details. Users can access and interact with the catalog after authentication through JSON Web Tokens (JWT). The API facilitates secure access to movie information, ensuring that only authorized users can utilize its functionalities.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api', app, document);

  await app.listen(3000);
}
bootstrap();
