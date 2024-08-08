import { Test, TestingModule } from '@nestjs/testing';
import { ScrapController } from './scrap.controller';
import { ScrapService } from '../service/scrap.service';

describe('AppController', () => {
  let scrapController: ScrapController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ScrapController],
      providers: [ScrapService],
    }).compile();

    scrapController = app.get<ScrapController>(ScrapController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(scrapController.getScrap()).toBe('Hello World!');
    });
  });
});
