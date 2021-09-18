import { Metadata } from '@grpc/grpc-js';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GRPC_HERO_FIND_ALL, GRPC_HERO_FIND_ONE, GRPC_HERO_GRPC, GRPC_HERO_TOKEN } from './hero.constans';
import { IHeroService } from './hero.service';
import { HeroById } from './interfaces/hero-by-id.interface';
import { Hero } from './interfaces/hero.interface';

@Controller()
export class HeroController {
  private heroService: IHeroService;

  private items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  constructor(@Inject(GRPC_HERO_TOKEN) private readonly client: ClientGrpc) {
    this.heroService = this.client.getService(GRPC_HERO_GRPC);
  }

  @Get('hero/:id')
  getById(@Param('id') id: string): Observable<Hero> {
    return this.heroService.findOne({ id: +id });
  }

  @GrpcMethod(GRPC_HERO_GRPC, GRPC_HERO_FIND_ONE)
  findOne(data: HeroById, metadata: Metadata): Hero {
    console.log('GRPC 服务被调用', data.id, metadata.get('id')[0]);
    return <Hero>this.items.find(({ id }) => id === data.id);
  }

  @Get('hero')
  getFindAll(): Observable<Hero[]> {
    const result = this.heroService.findAll({ id: 100 });
    return result;
  }

  @GrpcMethod(GRPC_HERO_GRPC, GRPC_HERO_FIND_ALL)
  findAll(): Hero[] {
    console.log('GRPC 服务findAll被调用');
    return <Hero[]>this.items;
  }
}
