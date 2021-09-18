import { Module } from '@nestjs/common';
import { HeroModule } from '../hero/hero.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HeroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
