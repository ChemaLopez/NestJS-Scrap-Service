import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class ScrapRequestDTO{

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    url:string;

    @Transform(({ value} ) => value === 'true')
    @IsBoolean()
    complexScrap:boolean
}


export class ScrapResponseDTO{
    
}