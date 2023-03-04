import { IsInt, MinLength, IsString, IsPositive } from "class-validator";

export class CreatePokemonDto {


    @IsPositive()
    @IsInt()
    @MinLength(1)
     no: number;

    @IsString()
    @MinLength(1)
     name: string;


}
