import { Module } from "@nestjs/common";
import { ScrapAdapter } from "./aplication/scrap.useCase";
import { ScrapProvider } from "./domain/providers/srap.providers";
import { ScrapOrchestrator } from "./domain/scrap.orchestrator";
import { ScrapController } from "./infraestructure/http-endpoint/scrap.controller";
import { PlayWrightScrapperService } from "./infraestructure/scrappers/playwrightScrapper.service";

@Module({
    imports: [],
    controllers: [ScrapController],
    providers: [ScrapAdapter,ScrapOrchestrator,ScrapProvider,
      PlayWrightScrapperService
    ],
  })
  export class ScrapModule {}
  