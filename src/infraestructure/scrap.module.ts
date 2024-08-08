import { Module } from "@nestjs/common";
import { ScrapPage } from "../aplication/scrap/scrap.useCase";
import { ScrapProvider } from "../domain/scrap/providers/srap.providers";
import { ScrapOrchestrator } from "../domain/scrap/scrap.orchestrator";
import { ScrapController } from "./http-endpoints/scrap/scrap.controller";
import { PlayWrightScrapperService } from "./scrappers/playwrightScrapper.service";
import { ScrapPagePortInterface } from "../domain/scrap/port/scrap.port";
import { FetchSiteMapReader } from "./site-map-reader/fetchSiteMapReader";

@Module({
    imports: [],
    controllers: [ScrapController],
    providers: [ScrapPage,
      ScrapOrchestrator,
      ScrapProvider,
      {
        provide:ScrapPagePortInterface,
        useExisting:ScrapPage
      },
      PlayWrightScrapperService,
      FetchSiteMapReader
    ],
  })
  export class ScrapModule {}
  