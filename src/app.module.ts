import { Module } from '@nestjs/common';
import { ScrapModule } from './scrapping/scrap.module';

@Module({
  imports: [ScrapModule],
  
})
export class AppModule {}
