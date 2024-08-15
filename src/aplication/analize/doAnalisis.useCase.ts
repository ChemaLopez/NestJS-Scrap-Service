import { Injectable } from "@nestjs/common";
import { DoAnalizeRequestDTO } from "./model/analize.model";
import { AnalizePortInterface } from "src/domain/analize/port/analize.port";
import { PlayWrightScrapperService } from "src/infraestructure/scrappers/playwrightScrapper.service";

@Injectable()
export class DoAnalizeRequestPort implements AnalizePortInterface{

    
    constructor(){}


    async execute(doAnalisis:DoAnalizeRequestDTO){

        //VALIDATE MODEL BEFORE CALL ORCHESTRATOR
        const playwright = new PlayWrightScrapperService()
      const result = playwright.resolveAnalize(new URL(doAnalisis.url))

        return result;
    }
}