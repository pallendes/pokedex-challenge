import { Pokemon } from '../../__generated__/graphql';

interface PokemonCardsFilters {
  sortCriteria: string;
  searchText: string;
  typeFilter: TypeFilters[];
}

const _sort = (pokemonList: Pokemon[], sortCriteria: string): Pokemon[] => {
  let sortedPokemons = [];

  switch (sortCriteria) {
    case 'name-asc':
      sortedPokemons = [...pokemonList].sort((a, b) =>
        a?.name && b?.name ? a?.name.localeCompare(b?.name) : 0
      );
      break;
    case 'name-desc':
      sortedPokemons = [...pokemonList].sort((a, b) =>
        a?.name && b?.name ? b?.name.localeCompare(a?.name) : 0
      );
      break;
    default:
      sortedPokemons = [...pokemonList];
      break;
  }

  return sortedPokemons;
};

export const filtersBuilder =
  (pokemons: Pokemon[]) =>
  ({ sortCriteria, searchText, typeFilter }: PokemonCardsFilters) => {
    let filteredPokemons: Pokemon[] = [...pokemons];

    if (typeFilter.length > 0) {
      filteredPokemons = filteredPokemons.filter((p) =>
        p.types
          ?.map((t) => t?.name)
          .some((n) => typeFilter.includes(n as TypeFilters))
      );
    }

    if (searchText) {
      filteredPokemons = [...filteredPokemons].filter(
        (p) =>
          p.name?.toLowerCase().includes(searchText.toLowerCase()) ??
          p.types
            ?.map((t) => t?.name)
            .some((n) => n?.toLowerCase().includes(searchText.toLowerCase()))
      );
    }

    return _sort(filteredPokemons, sortCriteria);
  };
