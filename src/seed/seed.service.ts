import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { FetchAdapter } from 'src/common/adapters/fetch.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly htpp: FetchAdapter
  ){}

  async executeSeed() {
    await this.pokemonModel.deleteMany() // This is similar to: delete * from pokemons
    
    const response: PokeResponse = await this.htpp.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=200')

    const pokemonToInsert: { name: string, no: number }[] = [];
    
    response.results.forEach(async ({ name, url }) => {
      const segments: string[] = url.split('/');
      const no: number = +segments[segments.length - 2];

      try {
        // await this.pokemonModel.create({ name, no });
        pokemonToInsert.push({ name, no }); // Is a fast form to insert in the DB
      } catch (error) {
        this.handleExceptions(error);
      }
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(error.keyValue)}`);
    }

    console.log(error);
    throw new InternalServerErrorException(`Can't create pokemon - Check server logs`)
  }
}
