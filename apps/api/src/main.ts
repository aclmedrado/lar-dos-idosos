import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Ativa a validação global com transformação automática
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades que não estão no DTO
    forbidNonWhitelisted: true, // Retorna erro se enviarem campos extras
    transform: true, // Transforma os tipos (ex: string para Date) automaticamente
  }));

  // Habilita CORS para o nosso frontend conseguir consumir a API no futuro
  app.enableCors();

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();