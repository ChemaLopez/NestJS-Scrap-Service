import { ScrapResultDTO } from "./model/scrapResult.DTO";

export interface ScraperInterface {
    scrapUrl(url:URL): Promise<ScrapResultDTO>
}