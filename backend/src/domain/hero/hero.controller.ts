import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { Hero } from './hero.entity';
import { CreateHero } from './hero.interface';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('/heroes')
export class HeroController {
  constructor(
    private readonly heroService: HeroService,
    private readonly jwtService: JwtService,
  ) {}

  private async checkLoggedIn(request: Request): Promise<void> {
    try {
      const cookie = request.cookies['token'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) throw new UnauthorizedException('Unauthorized.');
    } catch {
      throw new UnauthorizedException('Unauthorized.');
    }
  }


  @Get('/')
  async getAllHeroes(@Req() request: Request): Promise<Hero[]> {
    await this.checkLoggedIn(request);

    return this.heroService.findAll();
  }

  @Get('/:id')
  async getHeroById(@Req() request: Request, @Param('id') id: string): Promise<Hero> {
    await this.checkLoggedIn(request);

    return this.heroService.findById(id);
  }

  @Post('/')
  async addHero(
    @Req() request: Request,
    @Body() hero: CreateHero,
  ): Promise<Hero> {
    await this.checkLoggedIn(request);

    return this.heroService.create(hero);
  }

  @Delete('/:id')
  async deleteUser(
    @Req() request: Request,
    @Param('id') id: number,
  ): Promise<void> {
    await this.checkLoggedIn(request);

    await this.heroService.deleteById(id);
  }
}
