import { Injectable } from "@nestjs/common";
import { chromium } from "playwright";
import { ScrapResultDTO } from "src/scrapping/domain/model/scrapResult.DTO";
import { ScraperInterface } from "src/scrapping/domain/scraper";

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
            return index === self.indexOf(elem) || elem.includes('/');
        })

        await browser.close()
        return {scrapResult:result}
       
    }



}