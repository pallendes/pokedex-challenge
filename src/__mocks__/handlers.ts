import { graphql } from 'msw';
import { mockAllPokemonQueryResponse } from './queries/all-pokemon';

const pokemonApi = graphql.link('https://dex-server.herokuapp.com/');

export const handlers = [
  pokemonApi.query('AllPokemon', (req, res, ctx) =>
    res(ctx.data(mockAllPokemonQueryResponse))
  ),
];
