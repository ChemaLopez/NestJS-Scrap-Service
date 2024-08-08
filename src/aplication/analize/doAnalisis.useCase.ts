import { Injectable } from "@nestjs/common";
import { DoAnalizeRequestDTO } from "./model/analize.model";

@Injectable()
export class DoAnalizeRequestPort implements DoAnalizeRequestPort{

    
    constructor(){}


    async execute(doAnalisis:DoAnalizeRequestDTO){

        //VALIDATE MODEL BEFORE CALL ORCHESTRATOR
       return  

       
    }
}