import { ScrapRequestDTO } from "src/aplication/scrap/model/scrap.model";
import { ScrapProvider } from "./providers/srap.providers";
import { URL } from "url";

export class ScrapOrchestrator {
    private scrapProvider:ScrapProvider

    constructor(){
        this.scrapProvider = new ScrapProvider()
    }


    async execute(url:ScrapRequestDTO){
        const scrapService= this.scrapProvider.getScrappService();
        const siteMapReader= this.scrapProvider.getSiteMapReader();

        const urlToScrap = new URL('https://'+url.url);
        
        if(url.complexScrap===false)
          return  await siteMapReader.readRobotsTxt(urlToScrap);

       return await scrapService.scrapUrl(urlToScrap)
    }
}