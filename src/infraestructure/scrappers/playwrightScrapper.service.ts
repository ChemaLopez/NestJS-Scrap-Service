import { Injectable } from "@nestjs/common";
import { chromium } from "playwright";
import { ScrapResultDTO } from "src/domain/scrap/model/scrapResult.DTO";
import { ScraperInterface } from "src/domain/scrap/model/scraper";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayWrightScrapperService  implements ScraperInterface{
    

    async scrapUrl(url:URL): Promise<ScrapResultDTO> {


        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(url.toString());

        let result =await page.$$eval('a', (links)=>
            links.map((element)=>element.getAttribute('href'))
        ) 
        
        result = result.filter((elem, index, self) =>{
            let toDelete= index === self.indexOf(elem)
             toDelete =toDelete&& elem.includes('/') 
             && !elem.includes(' ');
            if(elem.includes('https://') || elem.includes('https://'))
               toDelete= toDelete && elem.includes(url.toString())
             return toDelete;
        })
        const scrapResult= result.map(elem =>{return {url:elem, id: uuidv4()}})
        await browser.close()
        return {scrapResult:scrapResult}
       
    }


}