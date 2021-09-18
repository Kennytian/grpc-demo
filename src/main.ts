import { MicroserviceOptions } from '@nestjs/microservices';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { grpcClientOptions } from './hero/grpc-client.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  await app.startAllMicroservices();
  await app.listen(3001);
  console.log(`Application is running on http://localhost:3001`);
}

bootstrap();
