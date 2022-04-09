import { Injectable, Inject } from '@nestjs/common';
import { Hero } from './hero.entity';
import { CreateHero } from './hero.interface';

@Injectable()
export class HeroService {
  constructor(
    @Inject('HERO_REPOSITORY')
    private heroRepository: typeof Hero,
  ) {}

  async findAll(): Promise<Hero[]> {
    return this.heroRepository.findAll<Hero>();
  }

  async findById(id: string): Promise<Hero> {
    return this.heroRepository.findByPk<Hero>(id);
  }

  async create(hero: CreateHero): Promise<Hero> {
    return this.heroRepository.create<Hero>({
      name: hero.name,
      shortDescription: hero.shortDescription,
      description: hero.description,
      power: hero.power
    });
  }

  async deleteById(id: number): Promise<void> {
    await this.heroRepository.destroy({ where: { id } });
  }
}