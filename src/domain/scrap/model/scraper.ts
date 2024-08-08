import { ScrapResultDTO } from "./scrapResult.DTO";

export interface ScraperInterface {
    scrapUrl(url:URL): Promise<ScrapResultDTO>
}