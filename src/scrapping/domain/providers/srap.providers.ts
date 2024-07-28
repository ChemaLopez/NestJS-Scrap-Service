import { PlayWrightScrapperService } from "src/scrapping/infraestructure/scrappers/playwrightScrapper.service";
import { Injectable } from "@nestjs/common";
import { ScraperInterface } from "../scraper";


@Injectable()
export class ScrapProvider {

    constructor(private playWrightScrapperService : PlayWrightScrapperService){}

    getScrappService():ScraperInterface{
        return this.playWrightScrapperService;
    }


}