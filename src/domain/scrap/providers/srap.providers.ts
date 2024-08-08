import { PlayWrightScrapperService } from "src/infraestructure/scrappers/playwrightScrapper.service";
import { Injectable } from "@nestjs/common";
import { ScraperInterface } from "../model/scraper";
import { SiteMapReaderInterface } from "../model/siteMapReader";
import { FetchSiteMapReader } from "../../../infraestructure/site-map-reader/fetchSiteMapReader";


@Injectable()
export class ScrapProvider {

    constructor(private playWrightScrapperService : PlayWrightScrapperService,
        private siteMapReader:FetchSiteMapReader
    ){}

    getScrappService():ScraperInterface{
        return this.playWrightScrapperService;
    }

    getSiteMapReader():SiteMapReaderInterface{
        return this.siteMapReader
    }
}