import {IsInt, IsPositive, IsString, Min} from 'class-validator'

export class CreatePokemonDto {
    @IsString()
    @Min(1)
    name: string;

    @IsInt()
    @IsPositive()
    @Min(1)
    no: number
}
