import { Module } from '@nestjs/common';
import { ScrapModule } from './infraestructure/scrap.module';
import { AnalizeModule } from './infraestructure/analize.module';

@Module({
  imports: [ScrapModule,AnalizeModule],
  
})
export class AppModule {}
