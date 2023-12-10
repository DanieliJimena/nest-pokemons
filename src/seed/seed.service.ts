import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  //esto crea una dependencia de mi servicio
  private readonly axios: AxiosInstance =axios

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}
 
  async excecuteSeed() {

    await this.pokemonModel.deleteMany({})
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    const pokemonToInsert: {name:string, no:number}[]= [];

    data.results.forEach(async({name, url}) =>{

      const segments =url.split('/');
      const no = +segments[segments.length - 2]

      pokemonToInsert.push({name, no})
      
      /* const pokemon =await this.pokemonModel.create({name, no}) */
      //el problema con este metodo es que tenemos que esperar a que se hagan todas las insercciones de cada uno de los pokemons
    })

    await this.pokemonModel.insertMany(pokemonToInsert)
    return data.results;
  }

  
}
