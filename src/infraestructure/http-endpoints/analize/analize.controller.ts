import { Body, Controller, Post } from '@nestjs/common';
import { DoAnalizeRequestDTO } from 'src/aplication/analize/model/analize.model';
import { AnalizePortInterface } from 'src/domain/scrap/port/analize.port';

@Controller()
export class AnalizeController {
  constructor(private readonly scrapAdapter :AnalizePortInterface) {}

  @Post()
  async getAnalisis(@Body()  makeAnalisis: DoAnalizeRequestDTO){
    console.log(makeAnalisis)
    const responseData= await this.scrapAdapter.execute(makeAnalisis);
    return '';
  }
}
