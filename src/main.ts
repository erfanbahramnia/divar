import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // create an instance of application
  const app = await NestFactory.create(AppModule);
  // config swagger
  const config = new DocumentBuilder()
    .setTitle("Divar")
    .setDescription("a backend for divar application powered by nestjs")
    .setVersion("1.0")
    .addBasicAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter jwt token",
        in: "headers"
      },
      "JWT-AUTH"
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  // config pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))
  // run app
  await app.listen(3000);
}
bootstrap();
