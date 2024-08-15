import { DoAnalizeRequestDTO, AnalizeResponseDTO } from "src/aplication/analize/model/analize.model";


export abstract class AnalizePortInterface {
     
   abstract execute(analizePage:DoAnalizeRequestDTO):AnalizeResponseDTO

 }