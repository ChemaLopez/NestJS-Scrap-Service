import { PlayWrightScrapperService } from "src/infraestructure/scrappers/playwrightScrapper.service";
import { Injectable } from "@nestjs/common";
import { ScraperInterface } from "../model/scraper";
import { SiteMapReaderInterface } from "../model/siteMapReader";
import { FetchSiteMapReader } from "../../../infraestructure/site-map-reader/fetchSiteMapReader";


export class ScrapProvider {

    private playWrightScrapperService : PlayWrightScrapperService;
    private siteMapReader:FetchSiteMapReader;

    constructor(){
        this.playWrightScrapperService = new PlayWrightScrapperService();
        this.siteMapReader= new FetchSiteMapReader()
    }

    getScrappService():ScraperInterface{
        return this.playWrightScrapperService;
    }

    getSiteMapReader():SiteMapReaderInterface{
        return this.siteMapReader
    }
}