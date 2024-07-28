import { Controller, Get, Query } from '@nestjs/common';
import { ScrapRequestDTO } from '../../aplication/model/scrap.model';
import { ScrapAdapter } from '../../aplication/scrap.useCase';

@Controller()
export class ScrapController {
  constructor(private readonly scrapAdapter :ScrapAdapter) {}

  @Get()
  async getScrap(@Query() url: ScrapRequestDTO): Promise<any> {
    return await this.scrapAdapter.execute(url);

  }
}
