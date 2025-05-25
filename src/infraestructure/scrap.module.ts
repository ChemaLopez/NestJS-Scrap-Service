import { Module } from "@nestjs/common";
import { ScrapPage } from "../aplication/scrap/scrap.useCase";
import { ScrapController } from "./http-endpoints/scrap/scrap.controller";
import { ScrapPagePortInterface } from "../domain/scrap/port/scrap.port";
import { FetchSiteMapReader } from "./site-map-reader/fetchSiteMapReader";

@Module({
    imports: [],
    controllers: [ScrapController],
    providers: [
      {
        provide:ScrapPagePortInterface,
        useClass: ScrapPage
      },
      FetchSiteMapReader
    ],
  })
  export class ScrapModule {}
  