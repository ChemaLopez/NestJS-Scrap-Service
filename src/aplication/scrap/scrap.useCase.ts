import { Injectable } from "@nestjs/common";
import { ScrapRequestDTO } from "./model/scrap.model";
import { ScrapOrchestrator } from "src/domain/scrap/scrap.orchestrator";
import { ScrapPagePortInterface } from "src/domain/scrap/port/scrap.port";

@Injectable()
export class ScrapPage implements ScrapPagePortInterface{

    
    constructor(private scrapOrchestrator :ScrapOrchestrator){}
   



    async execute(url:ScrapRequestDTO){

        //VALIDATE MODEL BEFORE CALL ORCHESTRATOR
       return  this.scrapOrchestrator.execute(url)

       
    }
}