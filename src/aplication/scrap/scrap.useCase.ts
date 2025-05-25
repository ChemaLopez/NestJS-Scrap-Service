import { Injectable } from "@nestjs/common";
import { ScrapRequestDTO } from "./model/scrap.model";
import { ScrapOrchestrator } from "src/domain/scrap/scrap.orchestrator";
import { ScrapPagePortInterface } from "src/domain/scrap/port/scrap.port";

@Injectable()
export class ScrapPage implements ScrapPagePortInterface{

    private scrapOrchestrator :ScrapOrchestrator
    constructor(){
        this.scrapOrchestrator = new ScrapOrchestrator();
    }
   



    async execute(url:ScrapRequestDTO){
       return  this.scrapOrchestrator.execute(url)
    }
}