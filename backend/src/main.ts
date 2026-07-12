import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Seguridad
  app.use(helmet());
  app.enableCors({
    origin: '*', // Se puede restringir al frontend
  });

  // Validaciones globales
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Documentación con Swagger
  const config = new DocumentBuilder()
    .setTitle('Modularis API')
    .setDescription('API para el Sistema de Gestión Escolar (Contexto de Encierro - CENS)')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
