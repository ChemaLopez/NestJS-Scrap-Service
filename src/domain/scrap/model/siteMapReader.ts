import { ScrapElement, ScrapResultDTO } from "./scrapResult.DTO";


export interface SiteMapReaderInterface {

    readRobotsTxt(url:URL):Promise<ScrapResultDTO>
    getSiteMapLocations(url:URL):Promise<ScrapElement[]>

}