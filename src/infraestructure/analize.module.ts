import { Module } from "@nestjs/common";
import { AnalizeController } from "./http-endpoints/analize/analize.controller";
import { AnalizePortInterface } from "src/domain/analize/port/analize.port";
import { DoAnalizeRequestPort } from "../aplication/analize/doAnalisis.useCase";
import { PlayWrightScrapperService } from "./scrappers/playwrightScrapper.service";

@Module({
    imports: [],
    controllers: [AnalizeController],
    providers: [DoAnalizeRequestPort,
      {
        provide:AnalizePortInterface,
        useExisting:DoAnalizeRequestPort
      },
      PlayWrightScrapperService,
    ],
  })
  export class AnalizeModule {}
  