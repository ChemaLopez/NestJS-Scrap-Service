import { Injectable } from "@nestjs/common";
import { ScrapRequestDTO } from "./model/scrap.model";
import { chromium } from "playwright";
import { ScrapOrchestrator } from "src/scrapping/domain/scrap.orchestrator";
import { ScrapPortInterface } from "src/scrapping/domain/port/scrap.port";

@Injectable()
export class ScrapAdapter implements ScrapPortInterface{

    
    constructor(private scrapOrchestrator :ScrapOrchestrator){}
   



    async execute(url:ScrapRequestDTO){

        //VALIDATE MODEL BEFORE CALL ORCHESTRATOR
       return  this.scrapOrchestrator.execute(url)

       
    }
}