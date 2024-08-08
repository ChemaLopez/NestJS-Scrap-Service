import { IsString, IsNotEmpty, IsUrl } from "class-validator"

export class DoAnalizeRequestDTO{

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    url:string
    
    @IsString()
    @IsNotEmpty()
    id:string
}


export class AnalizeResponseDTO{
    
}
