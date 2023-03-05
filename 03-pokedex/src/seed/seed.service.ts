import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

  ) { }


  async executeSeed() {

    await this.pokemonModel.deleteMany({});
    const { data } = await this.axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=650`);

    // Forma 1 de inserción Simultanea 
    // const insertPromisesArray = [];

    // data.results.forEach( async ({ name, url })=> {

    //   const segments = url.split('/');
    //   const no:number = +segments[ segments.length - 2 ]
    //   insertPromisesArray.push(
    //     this.pokemonModel.create({name, no})
    //   )})

    // await Promise.all( insertPromisesArray )

    const pokemonToInsert: { name: string, no: number }[] = []

    data.results.forEach(async ({ name, url }) => {

      const segments = url.split('/');
      const no: number = +segments[segments.length - 2]

      pokemonToInsert.push(({ name, no }))
    })

    await this.pokemonModel.insertMany(pokemonToInsert)
    return `Seed Executed`

  }


}
