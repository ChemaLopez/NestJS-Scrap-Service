import { Injectable } from "@nestjs/common";
import { ScrapResultDTO } from "../../domain/scrap/model/scrapResult.DTO";
import { SiteMapReaderInterface } from "../../domain/scrap/model/siteMapReader";
import { XMLParser} from 'fast-xml-parser';
import { SiteMap } from "src/domain/scrap/model/siteMapModel";
import { v4 as uuidv4 } from 'uuid';

@Injectable()

export class FetchSiteMapReader implements SiteMapReaderInterface{

    async readRobotsTxt(url:URL):Promise<ScrapResultDTO>{
        const response = await fetch(url.origin+'/robots.txt')
        if(!response.ok){
            return {scrapResult:[]}
        }
        const rawText = await response.text();

        const siteMapUrl =rawText.split('\n').filter(elem => elem.includes('Sitemap:'));
        return this.getSiteMapLocations(new URL(siteMapUrl[0]));

    }




   async getSiteMapLocations(url:URL): Promise<ScrapResultDTO> {
        const response = await fetch(url.pathname)
        if(!response.ok){
            return {scrapResult:[]}
        }
        const rawXMLString = await response.text();

        const parser = new XMLParser();
        let siteMap = <SiteMap>parser.parse(rawXMLString);

        const urls= siteMap.urlset.url.map(elem => {return {id: uuidv4(),url:elem.loc}})        
        return {scrapResult:urls}
    };
    
}