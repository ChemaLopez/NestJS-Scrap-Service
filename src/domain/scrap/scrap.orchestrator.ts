import { ScrapRequestDTO } from "src/aplication/scrap/model/scrap.model";
import { ScrapProvider } from "./providers/srap.providers";
import { URL } from "url";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ScrapOrchestrator {


    constructor(private scrapProvider:ScrapProvider){
    }


    async execute(url:ScrapRequestDTO){
        const scrapService= this.scrapProvider.getScrappService();
        const siteMapReader= this.scrapProvider.getSiteMapReader();

        const urlToScrap = new URL('https://'+url.url);

        const siteMap = await siteMapReader.readRobotsTxt(urlToScrap);
        if(siteMap.scrapResult.length>0){
            return siteMap}

       return scrapService.scrapUrl(urlToScrap)
    }
}