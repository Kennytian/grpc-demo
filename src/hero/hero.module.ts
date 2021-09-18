import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-client.options';
import { GRPC_HERO_TOKEN } from './hero.constans';
import { HeroController } from './hero.controller';

@Module({
  imports: [ClientsModule.register([{ name: GRPC_HERO_TOKEN, ...grpcClientOptions }])],
  controllers: [HeroController],
})
export class HeroModule {}
