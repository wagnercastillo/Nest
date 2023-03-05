import { IsInt, MinLength, IsString, IsPositive } from "class-validator";

export class CreatePokemonDto {


    @IsPositive()
    @IsInt()
     no: number;

    @IsString()
    @MinLength(1)
     name: string;


}
