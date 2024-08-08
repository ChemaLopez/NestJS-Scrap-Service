import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class ScrapRequestDTO{

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    url:string
}


export class ScrapResponseDTO{
    
}