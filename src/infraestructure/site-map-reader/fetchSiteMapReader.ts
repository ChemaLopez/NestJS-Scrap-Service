import { Injectable } from "@nestjs/common";
import { ScrapElement, ScrapResultDTO } from "../../domain/scrap/model/scrapResult.DTO";
import { SiteMapReaderInterface } from "../../domain/scrap/model/siteMapReader";
import { XMLParser, XMLValidator} from 'fast-xml-parser';
import { SiteMap, UrlSetSiteMap, UrlSiteMap } from "src/domain/scrap/model/siteMapModel";
import { v4 as uuidv4 } from 'uuid';
import { retry } from "rxjs";

@Injectable()

export class FetchSiteMapReader implements SiteMapReaderInterface{

    async readRobotsTxt(url:URL):Promise<ScrapResultDTO>{
        const response = await fetch(url.origin+'/robots.txt')
        if(!response.ok){
            return {scrapResult:[]}
        }
        const rawText = await response.text();

        let siteMapUrl =rawText.split('\n').filter(elem => elem.includes('Sitemap:'));
        siteMapUrl=siteMapUrl.map((elem)=>elem.split('Sitemap: ')[1])
        //let results:ScrapElement[] =
        //siteMapUrl.forEach(async (siteMap)=> {results=results.concat(await this.getSiteMapLocations(new URL(siteMap)))})
        return {scrapResult: await this.getSiteMapLocations(new URL(siteMapUrl[0]))};

    }




   async getSiteMapLocations(url:URL,urls:ScrapElement[] =[]): Promise<ScrapElement[]> {
        const response = await fetch(url)
       if(!response.ok){
            return urls
        }
        const rawXMLString = await response.text();
        const parser = new XMLParser();
        const validXML=XMLValidator.validate(rawXMLString)
        if(typeof validXML === 'object')
            return urls
        let siteMap = <SiteMap>parser.parse(rawXMLString);
        urls=urls.concat(this.generateUrlElement(siteMap.urlset));
        
        if(siteMap.sitemapindex?.sitemap){
            for (const elem of siteMap.sitemapindex?.sitemap){
                const result = await this.getSiteMapLocations(new URL(elem.loc),urls)
                if(urls.length<5000000)
                    urls=urls.concat(result)
                else
                    return urls
            }
    
        }
        return urls

    };
    

    

    private generateUrlElement (urlset:UrlSetSiteMap ):ScrapElement[]{
        if(Boolean(urlset?.url)===false){
            return [];
        }
        if(Array.isArray(urlset.url)){
            return urlset.url.map(elem => {return {id: <string>uuidv4(),url:elem.loc}}) ;
        }
        if(urlset?.url?.loc)
            return [{id: <string>uuidv4(),url:urlset.url.loc}]
    }
}