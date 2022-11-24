import { useEffect, useState } from 'react';
import { Pokemon } from '../__generated__/graphql';
import * as favoritesService from '../services/favorites';

interface UseFavorites {
  favorites: Pokemon[];
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (pokemon: Pokemon) => void;
  isFavorite: (pokemon: Pokemon) => boolean;
}

export const useFavorites = (): UseFavorites => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    setFavorites(favoritesService.getAll());
  }, []);

  const addFavorite = (pokemon: Pokemon): void => {
    favoritesService.add(pokemon);
    setFavorites([...favoritesService.getAll()]);
  };

  const removeFavorite = (pokemon: Pokemon): void => {
    favoritesService.remove(pokemon);
    setFavorites([...favoritesService.getAll()]);
  };

  const isFavorite = (pokemon: Pokemon): boolean =>
    !!pokemon.id && favoritesService.isAddedToFavorites(pokemon.id);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};
