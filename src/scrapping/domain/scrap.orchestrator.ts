import { ScrapRequestDTO } from "src/scrapping/aplication/model/scrap.model";
import { ScrapProvider } from "./providers/srap.providers";
import { URL } from "url";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ScrapOrchestrator {


    constructor(private scrapProvider:ScrapProvider){
    }


    execute(url:ScrapRequestDTO){
       const scrapService= this.scrapProvider.getScrappService();
       const urlToScrap = new URL('https://'+url.url);
       return scrapService.scrapUrl(urlToScrap)
    }
}