import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('InventoryService');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT ? Number(process.env.PORT) : 3002;
  await app.listen(port);
  logger.log(`📦 Inventory Service is running on http://localhost:${port}`);
}

bootstrap().catch((error) => {
  console.error('Inventory application startup failed:', error);
  process.exit(1);
});
