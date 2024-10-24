import { Injectable } from "@nestjs/common";
import { ScrapElement, ScrapResultDTO } from "../../domain/scrap/model/scrapResult.DTO";
import { SiteMapReaderInterface } from "../../domain/scrap/model/siteMapReader";
import { XMLParser, XMLValidator} from 'fast-xml-parser';
import { SiteMap, UrlSetSiteMap } from "src/domain/scrap/model/siteMapModel";
import { v4 as uuidv4 } from 'uuid';
import { setTimeout } from "timers/promises";


@Injectable()

export class FetchSiteMapReader implements SiteMapReaderInterface{

    async readRobotsTxt(url:URL):Promise<ScrapResultDTO>{
        const response = await fetch(url.origin+'/robots.txt')
        if(!response.ok){
            console.log(response.status)
            return {scrapResult:[]}
        }
        const rawText = await response.text();

        let siteMapUrl =rawText.split('\n').filter(elem => elem.includes('Sitemap:'));
        siteMapUrl=siteMapUrl.map((elem)=>elem.split('Sitemap: ')[1])
        let results:ScrapElement[]=[];
       
        for (const siteMap of siteMapUrl){
            const results2= await this.getSiteMapLocations(new URL(siteMap));
            results=results.concat(results2)
        }
        return {scrapResult: results};

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
        const newResult = await this.generateUrlElement(siteMap.urlset)
        urls=urls.concat(newResult);
        
        if(siteMap.sitemapindex?.sitemap){
            for (const elem of siteMap.sitemapindex?.sitemap){
                const result = await this.getSiteMapLocations(new URL(elem.loc),urls)
                if(urls.length<3000000)
                    urls=urls.concat(result)
                else
                    return urls
            }
        }
        return urls
    };
    

    

    private async generateUrlElement (urlset:UrlSetSiteMap ):Promise<ScrapElement[]>{
        if(Boolean(urlset?.url)===false){
            return [];
        }
        if(Array.isArray(urlset.url)){
            return urlset.url.map(elem => {return {id: <string>uuidv4(),url:elem.loc}}) ;
            /*
            return await Promise.all(
                    urlset.url.map(async elem => {
                    try{
                        await setTimeout(2000)
                        const fetchedUrl = await fetch(elem.loc);
                        if(fetchedUrl.ok)
                            return {id: <string>uuidv4(),url:elem.loc}
                        else{
                            console.log(fetchedUrl.status,elem.loc)  
                        }
                    }catch{
                        console.log(elem.loc)
                    }            
            }))
        }
    */
    }
        if(urlset?.url?.loc)
            return [{id: <string>uuidv4(),url:urlset.url.loc}]
    }
}

