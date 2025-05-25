import AxeBuilder from "@axe-core/playwright";
import axe from "axe-core";
import { chromium } from "playwright";
import { ScrapResultDTO } from "src/domain/scrap/model/scrapResult.DTO";
import { ScraperInterface } from "src/domain/scrap/model/scraper";
import { Url } from "url";
import { v4 as uuidv4 } from 'uuid';

export class PlayWrightScrapperService implements ScraperInterface {


    private isStaticFile(url: string): boolean {
        const staticExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.js', '.css', '.ico', '.json', '.pdf'];
        return staticExtensions.some(ext => url.toLowerCase().includes(ext));
      }

    async scrapUrl(url: URL,maxDepth: number = 2): Promise<ScrapResultDTO> {

        const browser = await chromium.launch({ headless: true });
        const context = await browser.newContext({
            userAgent: ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15'
        });
        const allUrls = new Set<string>();
        const urlsToVisit = new Set<string>([url.href]);
        const visited = new Set<string>();
        let depth = 0;

        while (urlsToVisit.size > 0 && depth < maxDepth) {
          const currentBatch = Array.from(urlsToVisit);
          urlsToVisit.clear();
        
          for (const url of currentBatch) {
            if (visited.has(url)) continue;
            visited.add(url);
        
            try {
              const page = await context.newPage();
              await page.goto(url, { waitUntil: 'domcontentloaded' });
        
              // Extraer URLs de la página
              const foundUrls = await page.evaluate(() => {
                const anchors = Array.from(document.querySelectorAll('a'));
                return anchors.map(anchor => anchor.href);
              });
        
              // Filtrar, normalizar y añadir URLs encontradas
              for (const foundUrl of foundUrls) {
                const normalizedUrl =  new URL(foundUrl, url.toString()).href;
                allUrls.add(normalizedUrl);
        
                if (!visited.has(normalizedUrl) && !this.isStaticFile(normalizedUrl)) {
                  urlsToVisit.add(normalizedUrl);
                }
              }
        
              await page.close();
            } catch (error) {
              console.error(`Error al procesar ${url}:`, error.message);
            }
          }
        
          depth++;
        }

        const scrapResult= Array.from(allUrls, elem =>{return {url:elem, id: uuidv4()}});

        return {scrapResult:scrapResult} 

        /*
        await page.goto(url.href, {  timeout: 30000, waitUntil: 'domcontentloaded' });

        let result = await page.$$eval('a', (links) =>
            links.map((element) => element.getAttribute('href'))
        )

        result = result.filter((elem, index, self) => {
            if (elem === null) return false;
            
            let toDelete = index === self.indexOf(elem);
            toDelete = toDelete && (elem.includes('/') && !elem.includes(' '));
            if (elem?.includes('https://') || elem?.includes('http://'))
                toDelete = toDelete && elem.includes(url.href)
            
            return toDelete;
        });
        
        await browser.close()
        const scrapResult= result.map(elem =>{return {url:elem, id: uuidv4()}})
        return {scrapResult:scrapResult} 
    */
    
    
    }

    async resolveAnalize(url: URL): Promise<axe.AxeResults> {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(url.href);

        const axe = new AxeBuilder({ page });
        const results = await axe.analyze();
        await browser.close()
        return results
    }
}





