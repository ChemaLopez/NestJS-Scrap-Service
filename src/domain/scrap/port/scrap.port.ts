import { ScrapRequestDTO, ScrapResponseDTO } from "src/aplication/scrap/model/scrap.model"

export abstract class ScrapPagePortInterface {
     
   abstract execute(scrapRequestDTO:ScrapRequestDTO):ScrapResponseDTO

 }