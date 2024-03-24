/* eslint-disable @typescript-eslint/no-unused-vars */
import { CatsService } from './cats/cats.service';
import { Controller, Get, Req, Body, Param } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsService,
  ) {}

  @Get('hi')
  getAllCat(): string {
    return this.catsService.getAllCat();
    // return 'all cats';
  }

  @Get('hello/:id')
  getHello() // @Req() req: Request,
  // @Body() body: Body,
  // @Param() param: { id: string },
  : string {
    // console.log(req);
    // console.log(body);
    // console.log(param);
    return this.appService.getHello();
  }
}
