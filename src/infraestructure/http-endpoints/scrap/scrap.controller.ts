import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { ScrapRequestDTO } from '../../../aplication/scrap/model/scrap.model';
import { ScrapPage } from '../../../aplication/scrap/scrap.useCase';
import { ScrapPagePortInterface } from 'src/domain/scrap/port/scrap.port';

@Controller()
export class ScrapController {
  constructor(private readonly scrapAdapter :ScrapPagePortInterface) {}

  @Get()
  async getScrap(@Query() url: ScrapRequestDTO){
    const responseData= await this.scrapAdapter.execute(url);

    return responseData;
  }

}
