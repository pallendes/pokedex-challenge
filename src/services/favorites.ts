import { Pokemon } from '../__generated__/graphql';

const FAVORITES_KEY = 'favorites';

const _getFavoritesList = (): Pokemon[] => {
  const rawStoredFavorites = window.localStorage.getItem(FAVORITES_KEY);

  if (!rawStoredFavorites) return [];

  return JSON.parse(rawStoredFavorites);
};

export const add = (pokemon: Pokemon): void => {
  const storedFavorites: Pokemon[] = _getFavoritesList();

  const favoriteAlreadyExists = storedFavorites.find(
    (p) => p.id === pokemon.id
  );

  if (!favoriteAlreadyExists) {
    window.localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify([...storedFavorites, pokemon])
    );
  }
};

export const remove = (pokemon: Pokemon): void => {
  const storedFavorites: Pokemon[] = _getFavoritesList();

  const updatedList = storedFavorites.filter((p) => p.id !== pokemon.id);

  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedList));
};

export const getAll = (): Pokemon[] => _getFavoritesList();

export const isAddedToFavorites = (pokemonId: number): boolean =>
  _getFavoritesList().some((p) => p.id === pokemonId);
