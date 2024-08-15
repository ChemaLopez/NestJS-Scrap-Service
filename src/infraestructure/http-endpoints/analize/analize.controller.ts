import { Body, Controller, Post } from '@nestjs/common';
import { DoAnalizeRequestDTO } from 'src/aplication/analize/model/analize.model';
import { AnalizePortInterface } from 'src/domain/analize/port/analize.port';

@Controller()
export class AnalizeController {
  constructor(private readonly analizeAdapter :AnalizePortInterface) {}

  @Post()
  async getAnalisis(@Body()  makeAnalisis: DoAnalizeRequestDTO){
    const responseData= await this.analizeAdapter.execute(makeAnalisis);
    return responseData;
  }
}
