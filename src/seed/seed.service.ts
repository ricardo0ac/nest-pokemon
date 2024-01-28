import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-responde.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    //Eliminar pokemonos creados, para volver a insertarlos
    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    //variables de entrada
    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');

      const no = +segments[segments.length - 2];

      // const pokemon = await this.pokemonModel.create({ name, no });

      pokemonToInsert.push({ name, no });
    });

    //Insertar todos los pokemones

    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed Execute';
  }
}
