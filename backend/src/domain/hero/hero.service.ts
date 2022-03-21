import { Injectable, Inject } from '@nestjs/common';
import { Hero } from './hero.entity';

@Injectable()
export class HeroService {
  constructor(
    @Inject('HERO_REPOSITORY')
    private heroRepository: typeof Hero,
  ) {}

  async findAll(): Promise<Hero[]> {
    return this.heroRepository.findAll<Hero>();
  }
}
