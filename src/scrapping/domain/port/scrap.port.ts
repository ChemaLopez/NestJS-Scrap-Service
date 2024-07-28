import { ScrapRequestDTO, ScrapResponseDTO } from "src/scrapping/aplication/model/scrap.model"


export interface ScrapPortInterface {
     
    execute(scrapRequestDTO:ScrapRequestDTO):ScrapResponseDTO

 }