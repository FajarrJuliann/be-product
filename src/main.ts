// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from './common/logger.service';
import { LoggingInterceptor } from './common/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLoggerService(), // Gunakan logger kustom
  });
  app.enableCors();
  // Terapkan interceptor secara global
  app.useGlobalInterceptors(new LoggingInterceptor(new CustomLoggerService()));
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
